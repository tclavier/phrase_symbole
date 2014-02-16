# encoding: utf-8

class Phrase 
  include DataMapper::Resource
  property :id,   Serial
  property :json, Text, :required => true
end

class Bun < Sinatra::Base
  @flash

  configure do
    set :haml, :format => :html5
    DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/development.db")
    DataMapper.auto_migrate!
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

