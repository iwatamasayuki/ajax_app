class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")  # 1番目のレコードを@postに代入 /idをDESC（降順）で並び替える
  end


  def create
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post }
  end

  def checked
    post = Post.find(params[:id])
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end
end

