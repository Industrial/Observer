export Observable = !(o) ->
  o.events = {}

  o.on = !(e, fn) ->
    handlers = @events[e] = @events[e] or []
    handlers.push fn

  o.off = !(e, fn) ->
    if e
      if fn
        handlers = @events[e]
        for f, i in handlers
          if f is fn
            handlers.splice i
      else
        @events[e] = []
    else
      @events = {}

  o.once = !(e, fn) ->
    handlers = @events[e] = @events[e] or []
    handlers.push ~>
      @off e, fn
      fn!

  o.emit = !(e, ...args) ->
    handlers = @events[e]
    if handlers
      for handler in handlers
        handler ...args

  o.listeners = (e) ->
    @events[e] or []

  o.has-listeners = (e) ->
    @events[e].length > 0
