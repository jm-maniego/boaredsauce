Boaredsauce.Mixins.Finder =
  get_or_fetch: (id, options) ->
    model = @get(id)
    if model?
      options?.success? model
    else
      model = new @model({ id: id })
      model.fetch options
    model

  this_or_fetch: (options) ->
    if @length > 0
      options?.success? this
    else
      @fetch options
    this