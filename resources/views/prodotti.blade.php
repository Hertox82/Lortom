@extends('welcome') 
@section('title', 'Prodotti')
@section('content')
 
 @endsection 
@if(View::exists('js.js'))
	 @include('js.js')
@endif
@if(View::exists('css.css'))
	 @include('css.css')
@endif
@if(View::exists('meta.prodotti-meta'))
	 @include('meta.prodotti-meta')
@endif
