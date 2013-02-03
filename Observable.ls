export Observable = do
  events: {}

  on: (e, fn) ->
    @events[][e].push fn

  once: (e, fn) ->
    @events[][e].push ~>
      @off e, fn
      fn!

  off: (e, fn) ->
    | e and fn  => @events[e] .= filter (!= fn)
    | e         => @events[e] = {}
    | otherwise => @events = {}

  emit: (e, ...args) ->
    each ((x) -> x? ...args), @events[e] if @events[e]

  listeners: (e) ->
    @events[e] or []

  hasListeners: (e) ->
    @events[e].length > 0
