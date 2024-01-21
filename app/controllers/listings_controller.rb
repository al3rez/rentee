class ListingsController < ApplicationController
  before_action :set_listing, only: [ :show, :edit, :update, :destroy ]
  before_action :set_category, except: [:new, :create]

  def index
    @search_param = params[:q]
    @listings = current_user.listings
    @listings = @listings.where("title LIKE ?", "%" + @search_param + "%") if @search_param
  end

  def show
  end

  def new
    @listing = Listing.new
  end

  def edit
  end

  def create
    @listing = Listing.new(listing_params.merge(user_id: current_user.id))

    respond_to do |format|
      if @listing.save
        format.html { redirect_to category_listings_url(category_slug: @listing.category.slug), notice: "Listing was successfully created." }
        format.json { render :show, status: :created, location: @listing }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @listing.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @listing.update(listing_params)
        format.html { redirect_to listing_url(@listing), notice: "Listing was successfully updated." }
        format.json { render :show, status: :ok, location: @listing }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @listing.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @listing.destroy!

    respond_to do |format|
      format.html { redirect_to listings_url, notice: "Listing was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def search
    @listings = @category.listings.where("title ILIKE ?", "%#{params[:query]}%")
    respond_to do |format|
      format.turbo_stream
      format.html
    end
  end

  private

  def set_listing
    @listing = Listing.find(params[:id])
  end

  def set_category
    @category = Category.friendly.find(params[:category_slug])
  end

  def listing_params
    params.require(:listing).permit(:title, :description, :category_id, :postcode, :price_per_day, :price_per_month, :price_per_week, :item_value, :min_rental_days, photos: [])
  end
end
