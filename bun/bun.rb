# encoding: utf-8

class Bun < Sinatra::Base
  @flash

  configure do
    set :haml, :format => :html5
  end

  error do
    'Sorry there was a nasty error - ' + env['sinatra.error'].name
  end

  before do
    cache_control :public, :must_revalidate, :max_age => 60
  end

  get '/' do
    haml :index
  end
end
