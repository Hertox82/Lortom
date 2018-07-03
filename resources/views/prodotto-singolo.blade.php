@extends('welcome') 
@section('title', $title)
@section('content')
 
 @endsection 
@if(View::exists('js.js'))
	 @include('js.js')
@endif
@if(View::exists('css.css'))
	 @include('css.css')
@endif
@if(View::exists('meta.prodotto-singolo-meta'))
	 @include('meta.prodotto-singolo-meta')
@endif
