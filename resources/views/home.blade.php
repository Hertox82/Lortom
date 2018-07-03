@extends('welcome') 
@section('title', 'Home Page')
@section('content')
<div class="topBanner">
    <div class="topBanner-item">
        <img src="{{$topLogo}}" width="auto" height="auto">
    </div>
    <div class="topBanner-item">
        <span>Importatori e Distributori di Integratori Naturali</span>
        <span class="second">Selezioniamo per Voi solo il meglio!</span>
    </div>
    <div class="topBanner-item">
      <img id="leaf" src="{{$topImg}}" width="auto" height="auto">
    </div>
</div><nav class="navbar navbar-expand-lg navbar-light bg-green">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          @foreach($menuList as $menu)
            <li class="nav-item @if($menu['selected'] == true) active @endif">
                <a class="nav-link" href="{{$menu['href']}}">{{$menu['label']}}</a>
            </li>
          @endforeach
        </ul>
    </div>
</nav><div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    @php
    for($i=0; $i < count($images); $i++) {
     if($i == 0) {
    @endphp
    <li data-target="#carouselExampleIndicators" data-slide-to="{{$i}}" class="active"></li>
    @php
    } else {
  	@endphp
  		<li data-target="#carouselExampleIndicators" data-slide-to="{{$i}}"></li>
    @php
  	  }
  	}
    @endphp
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="./images/boxCarousel.png" alt="First slide">
      <div class="carousel-caption d-none d-md-block">
        <h3>Titolo</h3>
        <p>breve desc</p>
      </div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="./images/boxCarousel.png" alt="Second slide">
      <div class="carousel-caption d-none d-md-block">
        <h3>Titolo</h3>
        <p>breve desc</p>
      </div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="./images/boxCarousel.png" alt="Third slide">
      <div class="carousel-caption d-none d-md-block">
        <h3>Titolo</h3>
        <p>breve desc</p>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div><div class="marchi">
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>I Nostri Marchi</h2>
          <p> Trattiamo soltanto prodotti di altissima qualità. Ecco perchè abbiamo
              preferito costruire un rapporto di fiducia con Nature's Plus, Orthica
              e MasQuelier's</p>
        </div>
      </div>  
    </div>
  </div>
  <div class="container logo">
    <div class="row">
      <div class="col-lg-4 col-sm-12">
        <img src="./images/logo-naturesplus.png"/>
      </div>
      <div class="col-lg-4 col-sm-12">
        <img src="./images/logo-orthica.png"/>
      </div>
      <div class="col-lg-4 col-sm-12">
        <img src="./images/logo-masqueliers.png"/>
      </div>
    </div>
  </div>
</div><div class="prodotti">
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h3>I Nostri Prodotti</h3>
          <p>  
            Abbiamo sempre pensato che la salute meriti tutto il nostro impegno e il meglio in fatto di alimentazione e integratori. 
            Ci siamo rifiutati di scendere a compromessi evitando di proporre integratori minimali a bassi dosaggi di nutrienti e magari in forma poco biodisponibile...
          </p>
        </div>
      </div>  
    </div>
  </div>
  <div class="container">
      <div class="row">
        <div class="col-lg-4 col-sm-6" align="center">
          <div class="box-prodotto">
            <div class="box-image">
              <img src="./images/immunace.png"/>
              <span class="nuovo" style="display:none;">Nuovo</span>
            </div>
            <div class="box-content">
              <div class="text">
                <h3>Cal/Mag/D3 con K2 masticabile (gusto cioccolato)</h3>
                <p> 
                  Questa è una breve descrizione. Potremmo trovare modi infiniti per chiamare le nostre cose ma alla fine troviamo sempre la soluzione a quello che pensiamo
                    realmente Xfactor è un bel programma dai!
                  </p>
              </div>
              <div class="bottom">
                <a class="btn-green"href="./prodotto.html">
                  VAI
                </a>
            </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6" align="center">
          <div class="box-prodotto">
            <div class="box-image">
              <img src="./images/immunace.png"/>
              <span class="nuovo" style="display:none;">Nuovo</span>
            </div>
            <div class="box-content">
              <div class="text">
                <h3>Nome Prodotto</h3>
                <p>Questa è una breve descrizione</p>
              </div>
              <div class="bottom">
                  <a class="btn btn-green"href="./prodotto.html">
                    VAI
                  </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6" align="center">
          <div class="box-prodotto">
            <div class="box-image">
              <img src="./images/immunace.png"/>
              <span class="nuovo" style="display:none;">Nuovo</span>
            </div>
            <div class="box-content">
              <div class="text">
                <h3>Nome Prodotto</h3>
                <p>Questa è una breve descrizione</p>
              </div>
              <div class="bottom">
                  <a class="btn btn-green"href="./prodotto.html">
                    VAI
                  </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6" align="center">
          <div class="box-prodotto">
            <div class="box-image">
              <img src="./images/immunace.png"/>
              <span class="nuovo" style="display:none;">Nuovo</span>
            </div>
            <div class="box-content">
              <div class="text">
                <h3>Nome Prodotto</h3>
                <p>Questa è una breve descrizione</p>
              </div>
              <div class="bottom">
                  <a class="btn btn-green"href="./prodotto.html">
                    VAI
                  </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6" align="center">
            <div class="box-prodotto">
              <div class="box-image">
                <img src="./images/immunace.png"/>
                <span class="nuovo" style="display:none;">Nuovo</span>
              </div>
              <div class="box-content">
                <div class="text">
                  <h3>Nome Prodotto</h3>
                  <p>Questa è una breve descrizione</p>
                </div>
                <div class="bottom">
                    <a class="btn btn-green"href="./prodotto.html">
                      VAI
                    </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-6" align="center">
              <div class="box-prodotto">
                <div class="box-image">
                  <img src="./images/immunace.png"/>
                  <span class="nuovo" style="display:none;">Nuovo</span>
                </div>
                <div class="box-content">
                  <div class="text">
                    <h3>Nome Prodotto</h3>
                    <p>Questa è una breve descrizione</p>
                  </div>
                  <div class="bottom">
                      <a class="btn btn-green"href="./prodotto.html">
                        VAI
                      </a>
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</div><div class="ourStory">
  <div class="container">
    <div class="row justify-content-around">
      <div class="col-xl-3 col-lg-12">
        <div class="story-image">
          <img src="./images/box-ourstory.png"/>
        </div>
      </div>
      <div class="col-xl-9 col-lg-12">
        <div class="row">
          <div class="col-12">
            <h2>La Nostra Storia</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat. Aliquam egestas, velit at condimentum placerat, sem sapien laoreet mauris, dictum porttitor lacus est nec enim. Vivamus feugiat elit lorem, eu porttitor ante ultrices id. Phasellus suscipit tellus ante, nec dignissim elit imperdiet nec. Nullam fringilla feugiat nisl. Ut pretium, metus venenatis dictum viverra, dui metus finibus enim, ac rhoncus sem lorem vitae mauris. Suspendisse ut venenatis libero. Suspendisse lorem felis, pretium in maximus id, tempor non ipsum
                </p>
                <div class="bottom">
                    <a class="btn btn-violet" href="#">Continua</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div><div class="News">
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h3>News</h3>
        </div>
      </div>  
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="articolo">
          <div class="articolo-intestazione">
            <div class="categoria">
              <h4>Categoria</h4>
            </div>
            <img src="./images/box-articolo.png"/>
          </div>
          <div class="content">
            <div class="text">
              <h5>Titolo</h5>
              <p>
                  questo è un piccolo abstract dell'articolo.
                  Dovremmo essere capaci di poter scrivere almeno un
                  breve riassunto della news in questione, giusto?
              </p>
            </div>
            <div class="info">
              <div class="row">
                  <div class="col-6">
                    <span>Author: La Strega</span>
                  </div>
                  <div class="col-6">
                    <span>1st September 2017</span>
                  </div>
              </div>
            </div>
            <div class="bottom">
                <a href="#" class="btn float-right btn-green">Leggi</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
          <div class="articolo">
            <div class="articolo-intestazione">
              <div class="categoria">
                <h4>Categoria</h4>
              </div>
              <img src="./images/box-articolo.png"/>
            </div>
            <div class="content">
              <div class="text">
                <h5>Titolo</h5>
                <p>
                    questo è un piccolo abstract dell'articolo.
                    Dovremmo essere capaci di poter scrivere almeno un
                    breve riassunto della news in questione, giusto?
                </p>
              </div>
              <div class="info">
                <div class="row">
                    <div class="col-6">
                      <span>Author: La Strega</span>
                    </div>
                    <div class="col-6">
                      <span>1st September 2017</span>
                    </div>
                </div>
              </div>
              <div class="bottom">
                  <a href="#" class="btn float-right btn-green">Leggi</a>
              </div>
            </div>
          </div>
      </div>
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
          <div class="articolo">
            <div class="articolo-intestazione">
              <div class="categoria">
                <h4>Categoria</h4>
              </div>
              <img src="./images/box-articolo.png"/>
            </div>
            <div class="content">
              <div class="text">
                <h5>Titolo</h5>
                <p>
                    questo è un piccolo abstract dell'articolo.
                    Dovremmo essere capaci di poter scrivere almeno un
                    breve riassunto della news in questione, giusto?
                </p>
              </div>
              <div class="info">
                <div class="row">
                    <div class="col-6">
                      <span>Author: La Strega</span>
                    </div>
                    <div class="col-6">
                      <span>1st September 2017</span>
                    </div>
                </div>
              </div>
              <div class="bottom">
                  <a href="#" class="btn float-right btn-green">Leggi</a>
              </div>
            </div>
          </div>
      </div>
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="articolo">
          <div class="articolo-intestazione">
            <div class="categoria">
              <h4>Categoria</h4>
            </div>
            <img src="./images/box-articolo.png"/>
          </div>
          <div class="content">
            <div class="text">
              <h5>Titolo</h5>
              <p>
                  questo è un piccolo abstract dell'articolo.
                  Dovremmo essere capaci di poter scrivere almeno un
                  breve riassunto della news in questione, giusto?
              </p>
            </div>
            <div class="info">
              <div class="row">
                  <div class="col-6">
                    <span>Author: La Strega</span>
                  </div>
                  <div class="col-6">
                    <span>1st September 2017</span>
                  </div>
              </div>
            </div>
            <div class="bottom">
                <a href="#" class="btn float-right btn-green">Leggi</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="articolo">
          <div class="articolo-intestazione">
            <div class="categoria">
              <h4>Categoria</h4>
            </div>
            <img src="./images/box-articolo.png"/>
          </div>
          <div class="content">
            <div class="text">
              <h5>Titolo</h5>
              <p>
                  questo è un piccolo abstract dell'articolo.
                  Dovremmo essere capaci di poter scrivere almeno un
                  breve riassunto della news in questione, giusto?
              </p>
            </div>
            <div class="info">
              <div class="row">
                  <div class="col-6">
                    <span>Author: La Strega</span>
                  </div>
                  <div class="col-6">
                    <span>1st September 2017</span>
                  </div>
              </div>
            </div>
            <div class="bottom">
                <a href="#" class="btn float-right btn-green">Leggi</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="articolo">
          <div class="articolo-intestazione">
            <div class="categoria">
              <h4>Categoria</h4>
            </div>
            <img src="./images/box-articolo.png"/>
          </div>
          <div class="content">
            <div class="text">
              <h5>Titolo</h5>
              <p>
                  questo è un piccolo abstract dell'articolo.
                  Dovremmo essere capaci di poter scrivere almeno un
                  breve riassunto della news in questione, giusto?
              </p>
            </div>
            <div class="info">
              <div class="row">
                  <div class="col-6">
                    <span>Author: La Strega</span>
                  </div>
                  <div class="col-6">
                    <span>1st September 2017</span>
                  </div>
              </div>
            </div>
            <div class="bottom">
                <a href="#" class="btn float-right btn-green">Leggi</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div><footer>
  <div class="container">
      <div class="row">
          <div class="col-12">        
              <div class="list">
                  <div class="container">
                      <div class="row">
                          <div class="col-lg-4 col-xs-12">
                              <div class="indirizzi">
                                  <div class="container">
                                      <div class="row">
                                          <div class="col-12">
                                              <!--<img src="./images/logo-footer.png"/> -->
                                              <hr style="border:1px solid white">
                                              <ul>
                                                  <li>
                                                      <p>
                                                      Indirizzo: Via San Damaso 23/A
                                                      </p>
                                                  </li>
                                                  <li>
                                                      <p>
                                                      Telefono: +39 06632192
                                                      </p>
                                                  </li>
                                                  <li>
                                                      <p>
                                                      Fax: +39 06632196
                                                      </p>
                                                  </li>
                                                  <li>
                                                      <p>
                                                      Email: strega@lastrega.com
                                                      </p>
                                                  </li>
                                                  <li>
                                                      <p>
                                                      Seguci su: <span>Icona Facebook</span>
                                                      </p>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-lg-4 col-xs-12">
                              <div class="link-utili">
                                  <!-- <strong>Link Utili</strong> -->
                                  <div class="container link">
                                      <div class="row">
                                          <hr style="border:1px solid white; width:100%;">
                                          <div class="col-6">
                                              <ul>
                                              <li>
                                                  <a href="./index.html">Homepage</a>
                                              </li>
                                              <li>
                                                  <a href="./listaprodotti.html">Prodotti</a>
                                              </li>
                                              <li>
                                                  <a href="./rivenditori.html">Rivenditori</a>
                                              </li>
                                              <li>
                                                  <a href="./specialisti.html">Specialisti</a>
                                              </li>
                                              </ul>
                                          </div>
                                          <div class="col-6">
                                              <ul>
                                              <li>
                                                  <a href="#">Area Rivenditori</a>
                                              </li>
                                              <li>
                                                  <a href="#">Download</a>
                                              </li>
                                              <li>
                                                  <a href="./rivenditori.html#diventaRivenditore">Diventa Rivenditore</a>
                                              </li>
                                              <li>
                                                  <a href="#">Sitemap</a>
                                              </li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-lg-4 col-xs-12">
                              <div class="newsletter">
                                  <hr style="border:1px solid white;">
                                  <strong>Newsletter</strong>
                                  <div class="content">
                                      <div class="abstract">
                                      <p>
                                          Iscriviti alla nostra Newsletter per
                                          restare sempre aggiornato !
                                      </p>
                                      </div>
                                      <form>
                                      <input type="email" placeholder="email"/>
                                      <button type="submit">Iscriviti</button>
                                      </form>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-12">
              <div class="copy">
                  <ul>
                      <li>
                          <p>
                          © copyright 2017
                          </p>
                      </li>
                      <li>
                          <a href="#">Cookies Policy</a>
                      </li>
                      <li>
                          <a href="#">Privacy Policy</a>
                      </li>
                      <li>
                          <p>
                          La Strega s.r.l
                          </p>
                      </li>
                      <li>
                          <p>
                          Via S. Damaso 23/A - 00165 ROMA
                          </p>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</footer> 
 @endsection 
@if(View::exists('js.js'))
	 @include('js.js')
@endif
@if(View::exists('css.css'))
	 @include('css.css')
@endif
@if(View::exists('meta.home-meta'))
	 @include('meta.home-meta')
@endif
