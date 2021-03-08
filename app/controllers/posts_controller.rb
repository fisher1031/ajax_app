class PostsController < ApplicationController
  def index
    # メモを降順で表示
    @posts = Post.order(id: "DESC")
  end

  # def new
  # end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index  # 追記する
  end
end