# AjaxAppは、投稿されたメモ一覧をトップページに表示する仕様
Rails.application.routes.draw do
  root to: 'posts#index'  
  post 'posts', to: 'posts#create'
end