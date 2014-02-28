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
    set :symboles, {
      :article      => "Article : le petit ami du nom", 
      :adjectif     => "Adjectif : donne une information sur le nom", 
      :nom          => "Nom : désigne une personne, une chose ou un animal", 
      :pronom       => "Pronom : remplace la famille du nom (article, adjectif, nom)", 
      :verbe        => "Verbe : l'action de la phrase", 
      :adverbe      => "Adverbe : modifie le verbe", 
      :preposition  => "Préposition : montre la relation entre 2 mots",
      :conjonction  => "Conjonction : relie deux parties de phrases",
      :interjection => "Interjection : zut ! oh ! ha !" 
    };
  end

  error do
    'Sorry there was a nasty error - ' + env['sinatra.error'].name
  end

  before do
    cache_control :public, :must_revalidate, :max_age => 60
  end

  get '/' do
    @phrase = Phrase.first(:offset => rand(Phrase.count))
    if (@phrase == nil) 
      #redirect '/phrases/new'
      haml :index
    else 
      haml :index
    end
  end

  get '/phrases/new' do
    haml :new
  end

  post '/phrases' do
    phrase = Phrase.new(params[:phrase])
    if phrase.save
      redirect '/'
    else
      redirect '/phrases/new'
    end
  end

  get '/phrases/:id/edit' do |id|
    @phrase = Phrase.get!(id)
    haml :'edit'
  end

  post '/articles/:id' do |id|
    phrase = Phrase.get!(id)
    success = phrase.update!(params[:phrase])
    
    if success
      redirect "/articles/#{id}"
    else
      redirect "/articles/#{id}/edit"
    end
  end
end

