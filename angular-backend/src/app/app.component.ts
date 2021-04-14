import { Component, HostListener, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import {EventService} from '../services/event.service';
import {NavigationEnd, Router} from '@angular/router';
import { AuthService } from './auth-module/auth.service';

@Component({
  selector: 'app-roots',
  templateUrl: './app.component.html',
  styles: [''],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app';
  isAuth = false;
  user: any;
  urlLogin = '/backend/login';
  isLogin = true;
  year = 2017;
  height: any;
  lastPosition = 0;
  actualPosition  = 0;
  pinnedMenuTop = true;
  pinnedMenuBottom = false;
  menuTop = 0;
  menuIsPinned = false;
  resizing = false;

  @ViewChild('elSidebar') sidebar;
  @ViewChild('headerEl') headerEl;

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
        this.resizing = true;
          if (typeof(this.sidebar) != 'undefined') {
            this.setPinMenu();
          }
    }

    @HostListener('window:scroll', ['$event']) onScroll(e): void {
      this.actualPosition = this.getYPosition(e);
      this.resizing = false;
      this.setPinMenu();
   }


  constructor(private event: EventService, private authSer: AuthService, private router: Router, private drawer: Renderer2) {

    this.year = (new Date()).getFullYear();

    if (this.authSer.isAuthenticated()) {
        this.isLogin = false;
        this.isAuth = true;
        this.authSer.createUser();
        this.user = this.authSer._currentUser;
        this.getScreenSize();
    }
    this.router.events.subscribe(
        (val) => {
          if (val instanceof NavigationEnd) {
            if (this.urlLogin === val.url) {
              this.isLogin = true;
              this.isAuth = false;
            } else {
              this.isLogin = false;
            }
          }
        }
    );

    if (!this.isAuth) {
      sessionStorage.removeItem('users');
      sessionStorage.removeItem('roles');
    }
    this.event.getAuthenticate()
    .subscribe(
        (isLogged: boolean) => this.isAuth = isLogged
    );

    this.event.retriveUser()
    .subscribe(
        (user: any ) => {
          this.user = user;
        }
    );
  }

  getYPosition(e): number {
    return e.target.scrollingElement.scrollTop;
  }

  pinMenu() {
     /*
     * When the menu is higher than the window and smaller than the entire page.
     * It should be adjusted to be able to see the entire menu.
     *
     * Otherwise it can be accessed normally.
     */
      if ( this.height.menu + this.height.adminbar < this.height.window ) {
        this.unpinMenu();
        return;
      }
      this.menuIsPinned = true;
      const sidebar = this.sidebar.nativeElement;

      if ( this.height.menu + this.height.adminbar > this.height.window ) {
        // Check for overscrolling, this happens when swiping up at the top of the document in modern browsers.
        if ( this.actualPosition <= 0 ) {
            // Stick the menu to the top.
            if ( ! this.pinnedMenuTop ) {
              this.pinnedMenuTop = true;
              this.pinnedMenuBottom = false;

              this.drawer.setStyle(sidebar, 'position', 'fixed');
              this.drawer.setStyle(sidebar, 'top', '');
              this.drawer.setStyle(sidebar, 'bottom', '');
            }

            return;
        } else if ( this.actualPosition + this.height.window > document.documentElement.offsetHeight - 1 ) {
            // When overscrolling at the bottom, stick the menu to the bottom.
            if ( ! this.pinnedMenuBottom ) {
              this.pinnedMenuBottom = true;
              this.pinnedMenuTop = false;

              this.drawer.setStyle(sidebar, 'position', 'fixed');
              this.drawer.setStyle(sidebar, 'top', '');
              this.drawer.setStyle(sidebar, 'bottom', 0);
            }

            return;
        }

        const rect = sidebar.getBoundingClientRect();
        if ( this.actualPosition > this.lastPosition ) {
            // When a down scroll has been detected.
            // If it was pinned to the top, unpin and calculate relative scroll.
            if ( this.pinnedMenuTop ) {
              this.pinnedMenuTop = false;
                // Calculate new offset position.
                this.menuTop = rect.top - this.height.adminbar - ( this.actualPosition - this.lastPosition );
                if ( this.menuTop + this.height.menu + this.height.adminbar < this.actualPosition + this.height.window ) {
                  this.menuTop = this.actualPosition + this.height.window - this.height.menu - this.height.adminbar;
                }

                this.drawer.setStyle(sidebar, 'position', 'absolute');
                this.drawer.setStyle(sidebar, 'top', `${this.menuTop}px`);
                this.drawer.setStyle(sidebar, 'bottom', '');

            } else if ( ! this.pinnedMenuBottom &&
              rect.top + this.height.menu < this.actualPosition + this.height.window ) {
                // Pin it to the bottom.
                this.pinnedMenuBottom = true;

                this.drawer.setStyle(sidebar, 'position', 'fixed');
                this.drawer.setStyle(sidebar, 'top', '');
                this.drawer.setStyle(sidebar, 'bottom', 0);
            }
        } else if ( this.actualPosition < this.lastPosition ) {
            // When a scroll up is detected.

            // If it was pinned to the bottom, unpin and calculate relative scroll.
            if ( this.pinnedMenuBottom ) {
              this.pinnedMenuBottom = false;
                // Calculate new offset position.
                this.menuTop = rect.top - this.height.adminbar + this.actualPosition;
                if ( this.menuTop + this.height.menu > this.actualPosition + this.height.window ) {
                  this.menuTop = this.actualPosition;
                }

                this.drawer.setStyle(sidebar, 'position', 'absolute');
                this.drawer.setStyle(sidebar, 'top', `${this.menuTop}px`);
                this.drawer.setStyle(sidebar, 'bottom', '');

            } else if ( ! this.pinnedMenuTop && rect.top >= this.height.adminbar ) {

                // Pin it to the top.
                this.pinnedMenuTop = true;

                this.drawer.setStyle(sidebar, 'position', 'fixed');
                this.drawer.setStyle(sidebar, 'top', '');
                this.drawer.setStyle(sidebar, 'bottom', '');
            }
        } else if ( this.resizing ) {
            // Window is being resized.

            this.pinnedMenuTop = this.pinnedMenuBottom = false;

            // Calculate the new offset.
            this.menuTop = this.actualPosition + this.height.window - this.height.menu - this.height.adminbar - 1;

            if ( this.menuTop > 0 ) {

                this.drawer.setStyle(sidebar, 'position', 'absolute');
                this.drawer.setStyle(sidebar, 'top', `${this.menuTop}px`);
                this.drawer.setStyle(sidebar, 'bottom', '');
            } else {
                this.unpinMenu();
            }
        }
    }

    this.lastPosition = this.actualPosition;
  }

  unpinMenu() {
    if ( ! this.menuIsPinned) {
        return;
    }
    this.pinnedMenuTop = this.pinnedMenuBottom = this.menuIsPinned = false;
    const sidebar = this.sidebar.nativeElement;
    this.drawer.setStyle(sidebar, 'position', '');
    this.drawer.setStyle(sidebar, 'top', '');
    this.drawer.setStyle(sidebar, 'bottom', '');
  }

  resetHeights() {
      this.height = {
        window: window.innerHeight,
        menu: this.sidebar.nativeElement.offsetHeight,
        adminbar: this.headerEl.nativeElement.offsetHeight,
        document: document.documentElement.offsetHeight
      };
  }

  setPinMenu() {
    this.resetHeights();
    if (this.height.menu + this.height.adminbar > this.height.window) {
      this.pinMenu();
    } else {
      this.unpinMenu();
    }
  }
}
