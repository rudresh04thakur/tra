//[Master Javascript]

//Project:	Master Admin - Responsive Admin Template
//Primary use:	Master Admin - Responsive Admin Template

//should be included in all pages. It controls some layout


// Make sure jQuery has been loaded
if (typeof jQuery === 'undefined') {
  throw new Error('template requires jQuery')
}

// Layout()

//  Implements layout.
//  Fixes the layout height in case min-height fails.

//  @usage activated automatically upon window load.
//  Configure any options by passing data-option="value"
//  to the body tag.



+function ($) {
  'use strict'

  var DataKey = 'Masteradmin.layout'

  var Default = {
    slimscroll: false,
    resetHeight: true
  }

  var Selector = {
    wrapper: '.wrapper',
    contentWrapper: '.content-wrapper',
    layoutBoxed: '.layout-boxed',
    mainFooter: '.main-footer',
    mainHeader: '.main-header',
    sidebar: '.sidebar',
    controlSidebar: '.control-sidebar',
    fixed: '.fixed',
    sidebarMenu: '.sidebar-menu',
    logo: '.main-header .logo'
  }

  var ClassName = {
    fixed: 'fixed',
    holdTransition: 'hold-transition'
  }

  var Layout = function (options) {
    this.options = options
    this.bindedResize = false
    this.activate()
  }

  Layout.prototype.activate = function () {
    this.fix()
    this.fixSidebar()

    $('body').removeClass(ClassName.holdTransition)

    if (this.options.resetHeight) {
      $('body, html, ' + Selector.wrapper).css({
        'height': 'auto',
        'min-height': '100%'
      })
    }

    if (!this.bindedResize) {
      $(window).resize(function () {
        this.fix()
        this.fixSidebar()

        $(Selector.logo + ', ' + Selector.sidebar).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
          this.fix()
          this.fixSidebar()
        }.bind(this))
      }.bind(this))

      this.bindedResize = true
    }

    $(Selector.sidebarMenu).on('expanded.tree', function () {
      this.fix()
      this.fixSidebar()
    }.bind(this))

    $(Selector.sidebarMenu).on('collapsed.tree', function () {
      this.fix()
      this.fixSidebar()
    }.bind(this))
  }

  Layout.prototype.fix = function () {
    // Remove overflow from .wrapper if layout-boxed exists
    $(Selector.layoutBoxed + ' > ' + Selector.wrapper).css('overflow', 'hidden')

    // Get window height and the wrapper height
    var footerHeight = $(Selector.mainFooter).outerHeight() || 0
    var neg = $(Selector.mainHeader).outerHeight() + footerHeight
    var windowHeight = $(window).height()
    var sidebarHeight = $(Selector.sidebar).height() || 0

    // Set the min-height of the content and sidebar based on
    // the height of the document.
    if ($('body').hasClass(ClassName.fixed)) {
      $(Selector.contentWrapper).css('min-height', windowHeight - footerHeight)
    } else {
      var postSetHeight

      if (windowHeight >= sidebarHeight) {
        $(Selector.contentWrapper).css('min-height', windowHeight - neg)
        postSetHeight = windowHeight - neg
      } else {
        $(Selector.contentWrapper).css('min-height', sidebarHeight)
        postSetHeight = sidebarHeight
      }

      // Fix for the control sidebar height
      var $controlSidebar = $(Selector.controlSidebar)
      if (typeof $controlSidebar !== 'undefined') {
        if ($controlSidebar.height() > postSetHeight)
          $(Selector.contentWrapper).css('min-height', $controlSidebar.height())
      }
    }
  }

  Layout.prototype.fixSidebar = function () {
    // Make sure the body tag has the .fixed class
    if (!$('body').hasClass(ClassName.fixed)) {
      if (typeof $.fn.slimScroll !== 'undefined') {
        $(Selector.sidebar).slimScroll({ destroy: true }).height('auto')
      }
      return
    }

    // Enable slimscroll for fixed layout
    if (this.options.slimscroll) {
      if (typeof $.fn.slimScroll !== 'undefined') {
        // Destroy if it exists
        $(Selector.sidebar).slimScroll({ destroy: true }).height('auto')

        // Add slimscroll
        $(Selector.sidebar).slimScroll({
          height: ($(window).height() - $(Selector.mainHeader).height()) + 'px',
          color: 'rgba(0,0,0,0.2)',
          size: '3px'
        })
      }
    }
  }

  // Plugin Definition
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data(DataKey)

      if (!data) {
        var options = $.extend({}, Default, $this.data(), typeof option === 'object' && option)
        $this.data(DataKey, (data = new Layout(options)))
      }

      if (typeof option == 'string') {
        if (typeof data[option] == 'undefined') {
          throw new Error('No method named ' + option)
        }
        data[option]()
      }
    })
  }

  var old = $.fn.layout

  $.fn.layout = Plugin
  $.fn.layout.Constuctor = Layout

  // No conflict mode
  $.fn.layout.noConflict = function () {
    $.fn.layout = old
    return this
  }

  // Layout DATA-API
  $(window).on('load', function () {
    Plugin.call($('body'))
  });
}(jQuery)  // End of use strict

  /* PushMenu()
   * Adds the push menu functionality to the sidebar.
   *
   * @usage: $('.btn').pushMenu(options)
   *          or add [data-toggle="push-menu"] to any button
   *          Pass any option as data-option="value"
   */
  + function ($) {
    'use strict'

    var DataKey = 'Masteradmin.pushmenu'

    var Default = {
      collapseScreenSize: 767,
      expandOnHover: false,
      expandTransitionDelay: 200
    }

    var Selector = {
      collapsed: '.sidebar-collapse',
      open: '.sidebar-open',
      mainSidebar: '.main-sidebar',
      contentWrapper: '.content-wrapper',
      searchInput: '.sidebar-form .form-control',
      button: '[data-toggle="push-menu"]',
      mini: '.sidebar-mini',
      expanded: '',
      layoutFixed: '.fixed'
    }

    var ClassName = {
      collapsed: 'sidebar-collapse',
      open: 'sidebar-open',
      mini: 'sidebar-mini',
      expanded: '',
      expandFeature: '',
      layoutFixed: 'fixed'
    }

    var Event = {
      expanded: 'expanded.pushMenu',
      collapsed: 'collapsed.pushMenu'
    }

    // PushMenu Class Definition
    var PushMenu = function (options) {
      this.options = options
      this.init()
    }

    PushMenu.prototype.init = function () {
      //if (this.options.expandOnHover
      //      || ($('body').is(Selector.mini + Selector.layoutFixed))) {
      //      this.expandOnHover()
      //      $('body').addClass(ClassName.expandFeature)
      //    }

      $(Selector.contentWrapper).on(function () {
        // Enable hide menu when clicking on the content-wrapper on small screens
        if ($(window).width() <= this.options.collapseScreenSize && $('body').hasClass(ClassName.open)) {
          this.close()
        }
      }.bind(this))

      // __Fix for android devices
      $(Selector.searchInput).on(function (e) {
        e.stopPropagation()
      })
    }

    PushMenu.prototype.toggle = function () {
      var windowWidth = $(window).width()
      var isOpen = !$('body').hasClass(ClassName.collapsed)

      if (windowWidth <= this.options.collapseScreenSize) {
        isOpen = $('body').hasClass(ClassName.open)
      }

      if (!isOpen) {
        this.open()
      } else {
        this.close()
      }
    }

    PushMenu.prototype.open = function () {
      var windowWidth = $(window).width()

      if (windowWidth > this.options.collapseScreenSize) {
        $('body').removeClass(ClassName.collapsed)
          .trigger($.Event(Event.expanded))
      }
      else {
        $('body').addClass(ClassName.open)
          .trigger($.Event(Event.expanded))
      }
    }

    PushMenu.prototype.close = function () {
      var windowWidth = $(window).width()
      if (windowWidth > this.options.collapseScreenSize) {
        $('body').addClass(ClassName.collapsed)
          .trigger($.Event(Event.collapsed))
      } else {
        $('body').removeClass(ClassName.open + ' ' + ClassName.collapsed)
          .trigger($.Event(Event.collapsed))
      }
    }

    PushMenu.prototype.expandOnHover = function () {
      $(Selector.mainSidebar).hover(function () {
        if ($('body').is(Selector.mini + Selector.collapsed)
          && $(window).width() > this.options.collapseScreenSize) {
          this.expand()
        }
      }.bind(this), function () {
        if ($('body').is(Selector.expanded)) {
          this.collapse()
        }
      }.bind(this))
    }

    //  PushMenu.prototype.expand = function () {
    //    setTimeout(function () {
    //      $('body').removeClass(ClassName.collapsed)
    //        .addClass(ClassName.expanded)
    //    }, this.options.expandTransitionDelay)
    //  }

    PushMenu.prototype.collapse = function () {
      setTimeout(function () {
        $('body').removeClass(ClassName.expanded)
          .addClass(ClassName.collapsed)
      }, this.options.expandTransitionDelay)
    }

    // PushMenu Plugin Definition
    function Plugin(option) {
      return this.each(function () {
        var $this = $(this)
        var data = $this.data(DataKey)

        if (!data) {
          var options = $.extend({}, Default, $this.data(), typeof option === 'object' && option)
          $this.data(DataKey, (data = new PushMenu(options)))
        }

        if (option == 'toggle') data.toggle()
      })
    }

    var old = $.fn.pushMenu

    $.fn.pushMenu = Plugin
    $.fn.pushMenu.Constructor = PushMenu

    // No Conflict Mode
    $.fn.pushMenu.noConflict = function () {
      $.fn.pushMenu = old
      return this
    }

    // Data API
    $(document).on('click', Selector.button, function (e) {
      e.preventDefault()
      Plugin.call($(this), 'toggle')
    })
    $(window).on('load', function () {
      Plugin.call($(Selector.button))
    })
  }(jQuery) // End of use strict


  /* Tree()
   * Converts a nested list into a multilevel
   * tree view menu.
   *
   * @Usage: $('.my-menu').tree(options)
   *         or add [data-widget="tree"] to the ul element
   *         Pass any option as data-option="value"
   */
  + function ($) {
    'use strict'

    var DataKey = 'Masteradmin.tree'

    var Default = {
      animationSpeed: 500,
      accordion: true,
      followLink: false,
      trigger: '.treeview a'
    }

    var Selector = {
      tree: '.tree',
      treeview: '.treeview',
      treeviewMenu: '.treeview-menu',
      open: '.menu-open, .active',
      li: 'li',
      data: '[data-widget="tree"]',
      active: '.active'
    }

    var ClassName = {
      open: 'menu-open',
      tree: 'tree'
    }

    var Event = {
      collapsed: 'collapsed.tree',
      expanded: 'expanded.tree'
    }

    // Tree Class Definition
    var Tree = function (element, options) {
      this.element = element
      this.options = options

      $(this.element).addClass(ClassName.tree)

      $(Selector.treeview + Selector.active, this.element).addClass(ClassName.open)

      this._setUpListeners()
    }

    Tree.prototype.toggle = function (link, event) {
      var treeviewMenu = link.next(Selector.treeviewMenu)
      var parentLi = link.parent()
      var isOpen = parentLi.hasClass(ClassName.open)

      if (!parentLi.is(Selector.treeview)) {
        return
      }

      if (!this.options.followLink || link.attr('href') == '#') {
        event.preventDefault()
      }

      if (isOpen) {
        this.collapse(treeviewMenu, parentLi)
      } else {
        this.expand(treeviewMenu, parentLi)
      }
    }

    Tree.prototype.expand = function (tree, parent) {
      var expandedEvent = $.Event(Event.expanded)

      if (this.options.accordion) {
        var openMenuLi = parent.siblings(Selector.open)
        var openTree = openMenuLi.children(Selector.treeviewMenu)
        this.collapse(openTree, openMenuLi)
      }

      parent.addClass(ClassName.open)
      tree.slideDown(this.options.animationSpeed, function () {
        $(this.element).trigger(expandedEvent)
      }.bind(this))
    }

    Tree.prototype.collapse = function (tree, parentLi) {
      var collapsedEvent = $.Event(Event.collapsed)

      tree.find(Selector.open).removeClass(ClassName.open)
      parentLi.removeClass(ClassName.open)
      tree.slideUp(this.options.animationSpeed, function () {
        tree.find(Selector.open + ' > ' + Selector.treeview).slideUp()
        $(this.element).trigger(collapsedEvent)
      }.bind(this))
    }

    // Private

    Tree.prototype._setUpListeners = function () {
      var that = this

      $(this.element).on('click', this.options.trigger, function (event) {
        that.toggle($(this), event)
      })
    }

    // Plugin Definition
    function Plugin(option) {
      return this.each(function () {
        var $this = $(this)
        var data = $this.data(DataKey)

        if (!data) {
          var options = $.extend({}, Default, $this.data(), typeof option === 'object' && option)
          $this.data(DataKey, new Tree($this, options))
        }
      })
    }

    var old = $.fn.tree

    $.fn.tree = Plugin
    $.fn.tree.Constructor = Tree

    // No Conflict Mode
    $.fn.tree.noConflict = function () {
      $.fn.tree = old
      return this
    }

    // Tree Data API
    $(window).on('load', function () {
      $(Selector.data).each(function () {
        Plugin.call($(this))
      })
    })

  }(jQuery) // End of use strict


  /* ControlSidebar()
   * Toggles the state of the control sidebar
   *
   * @Usage: $('#control-sidebar-trigger').controlSidebar(options)
   *         or add [data-toggle="control-sidebar"] to the trigger
   *         Pass any option as data-option="value"
   */
  + function ($) {
    'use strict'

    var DataKey = 'Masteradmin.controlsidebar'

    var Default = {
      slide: true
    }

    var Selector = {
      sidebar: '.control-sidebar',
      data: '[data-toggle="control-sidebar"]',
      open: '.control-sidebar-open',
      bg: '.control-sidebar-bg',
      wrapper: '.wrapper',
      content: '.content-wrapper',
      boxed: '.layout-boxed'
    }

    var ClassName = {
      open: 'control-sidebar-open',
      fixed: 'fixed'
    }

    var Event = {
      collapsed: 'collapsed.controlsidebar',
      expanded: 'expanded.controlsidebar'
    }

    // ControlSidebar Class Definition
    var ControlSidebar = function (element, options) {
      this.element = element
      this.options = options
      this.hasBindedResize = false

      this.init()
    }

    ControlSidebar.prototype.init = function () {
      // Add click listener if the element hasn't been
      // initialized using the data API
      if (!$(this.element).is(Selector.data)) {
        $(this).on('click', this.toggle)
      }

      this.fix()
      $(window).resize(function () {
        this.fix()
      }.bind(this))
    }

    ControlSidebar.prototype.toggle = function (event) {
      if (event) event.preventDefault()

      this.fix()

      if (!$(Selector.sidebar).is(Selector.open) && !$('body').is(Selector.open)) {
        this.expand()
      } else {
        this.collapse()
      }
    }

    ControlSidebar.prototype.expand = function () {
      if (!this.options.slide) {
        $('body').addClass(ClassName.open)
      } else {
        $(Selector.sidebar).addClass(ClassName.open)
      }

      $(this.element).trigger($.Event(Event.expanded))
    }

    ControlSidebar.prototype.collapse = function () {
      $('body, ' + Selector.sidebar).removeClass(ClassName.open)
      $(this.element).trigger($.Event(Event.collapsed))
    }

    ControlSidebar.prototype.fix = function () {
      if ($('body').is(Selector.boxed)) {
        this._fixForBoxed($(Selector.bg))
      }
    }

    // Private

    ControlSidebar.prototype._fixForBoxed = function (bg) {
      bg.css({
        position: 'absolute',
        height: $(Selector.wrapper).height()
      })
    }

    // Plugin Definition
    function Plugin(option) {
      return this.each(function () {
        var $this = $(this)
        var data = $this.data(DataKey)

        if (!data) {
          var options = $.extend({}, Default, $this.data(), typeof option === 'object' && option)
          $this.data(DataKey, (data = new ControlSidebar($this, options)))
        }

        if (typeof option == 'string') data.toggle()
      })
    }

    var old = $.fn.controlSidebar

    $.fn.controlSidebar = Plugin
    $.fn.controlSidebar.Constructor = ControlSidebar

    // No Conflict Mode
    $.fn.controlSidebar.noConflict = function () {
      $.fn.controlSidebar = old
      return this
    }

    // ControlSidebar Data API
    $(document).on('click', Selector.data, function (event) {
      if (event) event.preventDefault()
      Plugin.call($(this), 'toggle')
    })

  }(jQuery) // End of use strict


  /* BoxWidget()
   * Adds box widget functions to boxes.
   *
   * @Usage: $('.my-box').boxWidget(options)
   *         This plugin auto activates on any element using the `.box` class
   *         Pass any option as data-option="value"
   */
  + function ($) {
    'use strict'

    var DataKey = 'Masteradmin.boxwidget'

    var Default = {
      animationSpeed: 500,
      collapseTrigger: '[data-widget="collapse"]',
      removeTrigger: '[data-widget="remove"]',
      collapseIcon: 'fa-minus',
      expandIcon: 'fa-plus',
      removeIcon: 'fa-times'
    }

    var Selector = {
      data: '.box',
      collapsed: '.collapsed-box',
      body: '.box-body',
      footer: '.box-footer',
      tools: '.box-tools'
    }

    var ClassName = {
      collapsed: 'collapsed-box'
    }

    var Event = {
      collapsed: 'collapsed.boxwidget',
      expanded: 'expanded.boxwidget',
      removed: 'removed.boxwidget'
    }

    // BoxWidget Class Definition
    var BoxWidget = function (element, options) {
      this.element = element
      this.options = options

      this._setUpListeners()
    }

    BoxWidget.prototype.toggle = function () {
      var isOpen = !$(this.element).is(Selector.collapsed)

      if (isOpen) {
        this.collapse()
      } else {
        this.expand()
      }
    }

    BoxWidget.prototype.expand = function () {
      var expandedEvent = $.Event(Event.expanded)
      var collapseIcon = this.options.collapseIcon
      var expandIcon = this.options.expandIcon

      $(this.element).removeClass(ClassName.collapsed)

      $(this.element)
        .find(Selector.tools)
        .find('.' + expandIcon)
        .removeClass(expandIcon)
        .addClass(collapseIcon)

      $(this.element).find(Selector.body + ', ' + Selector.footer)
        .slideDown(this.options.animationSpeed, function () {
          $(this.element).trigger(expandedEvent)
        }.bind(this))
    }

    BoxWidget.prototype.collapse = function () {
      var collapsedEvent = $.Event(Event.collapsed)
      var collapseIcon = this.options.collapseIcon
      var expandIcon = this.options.expandIcon

      $(this.element)
        .find(Selector.tools)
        .find('.' + collapseIcon)
        .removeClass(collapseIcon)
        .addClass(expandIcon)

      $(this.element).find(Selector.body + ', ' + Selector.footer)
        .slideUp(this.options.animationSpeed, function () {
          $(this.element).addClass(ClassName.collapsed)
          $(this.element).trigger(collapsedEvent)
        }.bind(this))
    }

    BoxWidget.prototype.remove = function () {
      var removedEvent = $.Event(Event.removed)

      $(this.element).slideUp(this.options.animationSpeed, function () {
        $(this.element).trigger(removedEvent)
        $(this.element).remove()
      }.bind(this))
    }

    // Private

    BoxWidget.prototype._setUpListeners = function () {
      var that = this

      $(this.element).on('click', this.options.collapseTrigger, function (event) {
        if (event) event.preventDefault()
        that.toggle()
      })

      $(this.element).on('click', this.options.removeTrigger, function (event) {
        if (event) event.preventDefault()
        that.remove()
      })
    }

    // Plugin Definition
    function Plugin(option) {
      return this.each(function () {
        var $this = $(this)
        var data = $this.data(DataKey)

        if (!data) {
          var options = $.extend({}, Default, $this.data(), typeof option === 'object' && option)
          $this.data(DataKey, (data = new BoxWidget($this, options)))
        }

        if (typeof option == 'string') {
          if (typeof data[option] == 'undefined') {
            throw new Error('No method named ' + option)
          }
          data[option]()
        }
      })
    }

    var old = $.fn.boxWidget

    $.fn.boxWidget = Plugin
    $.fn.boxWidget.Constructor = BoxWidget

    // No Conflict Mode
    $.fn.boxWidget.noConflict = function () {
      $.fn.boxWidget = old
      return this
    }

    // BoxWidget Data API
    $(window).on('load', function () {
      $(Selector.data).each(function () {
        Plugin.call($(this))
      })
    })

  }(jQuery) // End of use strict


  /* TodoList()
   * Converts a list into a todoList.
   *
   * @Usage: $('.my-list').todoList(options)
   *         or add [data-widget="todo-list"] to the ul element
   *         Pass any option as data-option="value"
   */
  + function ($) {
    'use strict'

    var DataKey = 'Masteradmin.todolist'

    var Default = {
      iCheck: false,
      onCheck: function () {
      },
      onUnCheck: function () {
      }
    }

    var Selector = {
      data: '[data-widget="todo-list"]'
    }

    var ClassName = {
      done: 'done'
    }

    // TodoList Class Definition
    var TodoList = function (element, options) {
      this.element = element
      this.options = options

      this._setUpListeners()
    }

    TodoList.prototype.toggle = function (item) {
      item.parents(Selector.li).first().toggleClass(ClassName.done)
      if (!item.prop('checked')) {
        this.unCheck(item)
        return
      }

      this.check(item)
    }

    TodoList.prototype.check = function (item) {
      this.options.onCheck.call(item)
    }

    TodoList.prototype.unCheck = function (item) {
      this.options.onUnCheck.call(item)
    }

    // Private

    TodoList.prototype._setUpListeners = function () {
      var that = this
      $(this.element).on('change ifChanged', 'input:checkbox', function () {
        that.toggle($(this))
      })
    }

    // Plugin Definition
    function Plugin(option) {
      return this.each(function () {
        var $this = $(this)
        var data = $this.data(DataKey)

        if (!data) {
          var options = $.extend({}, Default, $this.data(), typeof option === 'object' && option)
          $this.data(DataKey, (data = new TodoList($this, options)))
        }

        if (typeof data == 'string') {
          if (typeof data[option] == 'undefined') {
            throw new Error('No method named ' + option)
          }
          data[option]()
        }
      })
    }

    var old = $.fn.todoList

    $.fn.todoList = Plugin
    $.fn.todoList.Constructor = TodoList

    // No Conflict Mode
    $.fn.todoList.noConflict = function () {
      $.fn.todoList = old
      return this
    }

    // TodoList Data API
    $(window).on('load', function () {
      $(Selector.data).each(function () {
        Plugin.call($(this))
      })
    })

  }(jQuery) // End of use strict


  /* DirectChat()
   * Toggles the state of the control sidebar
   *
   * @Usage: $('#my-chat-box').directChat()
   *         or add [data-widget="direct-chat"] to the trigger
   */
  + function ($) {
    'use strict'

    var DataKey = 'Masteradmin.directchat'

    var Selector = {
      data: '[data-widget="chat-pane-toggle"]',
      box: '.direct-chat'
    }

    var ClassName = {
      open: 'direct-chat-contacts-open'
    }

    // DirectChat Class Definition
    var DirectChat = function (element) {
      this.element = element
    }

    DirectChat.prototype.toggle = function ($trigger) {
      $trigger.parents(Selector.box).first().toggleClass(ClassName.open)
    }

    // Plugin Definition
    function Plugin(option) {
      return this.each(function () {
        var $this = $(this)
        var data = $this.data(DataKey)

        if (!data) {
          $this.data(DataKey, (data = new DirectChat($this)))
        }

        if (typeof option == 'string') data.toggle($this)
      })
    }

    var old = $.fn.directChat

    $.fn.directChat = Plugin
    $.fn.directChat.Constructor = DirectChat

    // No Conflict Mode
    $.fn.directChat.noConflict = function () {
      $.fn.directChat = old
      return this
    }

    // DirectChat Data API
    $(document).on('click', Selector.data, function (event) {
      if (event) event.preventDefault()
      Plugin.call($(this), 'toggle')
    })

    // Slim scrolling

    $('.inner-content-div').slimScroll({
      height: '200'
    });

    $('.sm-scrol').slimScroll({
      height: '250'
    });

    $('.direct-chat-messages').slimScroll({
      height: '420'
    });

    $('.chat-box-one').slimScroll({
      height: '550'
    });

    $('.chat-box-one2').slimScroll({
      height: '580'
    });

    $('.chat-box-one-side').slimScroll({
      height: '650'
    });

    $('.chat-box-one-side2').slimScroll({
      height: '500'
    });

    $('.chat-box-one-side3').slimScroll({
      height: '685'
    });

    $('.notification-side').slimScroll({
      height: '325'
    });

    $('.suggestions-side').slimScroll({
      height: '300'
    });

    $('.events-side').slimScroll({
      height: '265'
    });

    $('.pat-div').slimScroll({
      height: '204'
    });
    $('.demo-panel-bx').slimScroll({
      height: 'auto'
    });

    $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
      $(".app-search").toggle(200);
    });



    // Close
    //
    $(document).on('click', '.box-btn-close', function () {
      $(this).parents('.box').fadeOut(600, function () {
        if ($(this).parent().children().length == 1) {
          $(this).parent().remove();
        }
        else {
          $(this).remove();
        }
      });
    });



    // Slide up/down
    //
    $(document).on('click', '.box-btn-slide', function () {
      $(this).toggleClass('rotate-180').parents('.box').find('.box-content, .box-body').slideToggle();
    });



    // Maximize
    //
    $(document).on('click', '.box-btn-maximize', function () {
      $(this).parents('.box').toggleClass('box-maximize').removeClass('box-fullscreen');
    });



    // Fullscreen
    //
    $(document).on('click', '.box-btn-fullscreen', function () {
      $(this).parents('.box').toggleClass('box-fullscreen').removeClass('box-maximize');
    });


    // Disable demonstrative links!
    //
    $(document).on('click', 'a[href="#"]', function (e) {
      e.preventDefault();
    });


    // This is for the innerleft sidebar
    $(".open-left-block").on('click', function () {
      $('.left-block').toggleClass('open-panel');
      $('.open-left-block').toggleClass('mdi-menu');
    });


    // Upload
    //
    $(document).on('click', '.file-browser', function () {
      var $browser = $(this);
      if ($browser.hasClass('form-control')) {
        setTimeout(function () {
          $browser.closest('.file-group').find('[type="file"]').trigger('click');
        }, 300);
      }
      else {
        var file = $browser.closest('.file-group').find('[type="file"]');
        file.on('click', function (e) {
          e.stopPropagation();
        });
        file.trigger('click');
      }
    });

    // Event to change file name after file selection
    $(document).on('change', '.file-group [type="file"]', function () {
      var input = $(this)[0];
      var len = input.files.length;
      var filename = '';

      for (var i = 0; i < len; ++i) {
        filename += input.files.item(i).name + ', ';
      }
      filename = filename.substr(0, filename.length - 2);
      $(this).closest('.file-group').find('.file-value').val(filename).text(filename).focus();
    });

    // Update file name for bootstrap custom file upload
    $(document).on('change', '.custom-file-input', function () {
      var filename = $(this).val().split('\\').pop();
      $(this).next('.custom-file-control').attr('data-input-value', filename);
    });
    $('.custom-file-control:not([data-input-value])').attr('data-input-value', 'Choose file...');



    /* The todo list plugin */
    $('.todo-list').todoList({
      onCheck: function () {
        window.console.log($(this), 'The element has been checked');
      },
      onUnCheck: function () {
        window.console.log($(this), 'The element has been unchecked');
      }
    });

    // bradcrumb section

    $('#thismonth').sparkline([8, 5, 4, 7, 9, 7, 10, 9], {
      type: 'bar',
      height: '35',
      barWidth: '4',
      resize: true,
      barSpacing: '4',
      barColor: '#843cf7'
    });
    $('#lastyear').sparkline([8, 5, 4, 7, 9, 7, 10, 9], {
      type: 'bar',
      height: '35',
      barWidth: '4',
      resize: true,
      barSpacing: '4',
      barColor: '#ec4b71'
    });
    var sparkResize;

    $("#chat-circle, #chat-box-toggle, #chat-popup").click(function () {
      $("#chat-box-body").toggleClass("show");
    });

  }(jQuery) // End of use strict

// Fullscreen
$(function () {
  'use strict'

  $('[data-provide~="fullscreen"]').on('click', function () {
    screenfull.toggle($('#container')[0]);
  });

}); // End of use strict


+function ($) {
  'use strict'

  // Dynamic active menu
  var path = window.location.pathname.split("/").pop();
  var target = $('.sidebar-menu li a[href="' + path + '"]');
  target.parent().addClass('active');
  $('.sidebar-menu li.active').parents('li').addClass('active');

}(jQuery) // End of use strict


  + function ($) {
    'use strict'

    // Dynamic active horizontal menu
    var path = window.location.pathname.split("/").pop();
    var target = $('.sm li a[href="' + path + '"]');
    target.parent().addClass('current');
    $('.sm li.current').parents('li').addClass('current');

  }(jQuery) // End of use strict


// feather icon
$(function () {
  'use strict'
  feather.replace();
}); // End of use strict




/*!
 * Waves v0.6.4
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */

; (function (window) {
  'use strict';

  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);

  // Find exact position of element
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  function offset(elem) {
    var docElem, win,
      box = { top: 0, left: 0 },
      doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }

  function convertStyle(obj) {
    var style = '';

    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += (a + ':' + obj[a] + ';');
      }
    }

    return style;
  }

  var Effect = {

    // Effect delay
    duration: 750,

    show: function (e, element) {

      // Disable right click
      if (e.button === 2) {
        return false;
      }

      var el = element || this;

      // Create ripple
      var ripple = document.createElement('div');
      ripple.className = 'waves-ripple';
      el.appendChild(ripple);

      // Get click coordinate and element witdh
      var pos = offset(el);
      var relativeY = (e.pageY - pos.top);
      var relativeX = (e.pageX - pos.left);
      var scale = 'scale(' + ((el.clientWidth / 100) * 10) + ')';

      // Support for touch devices
      if ('touches' in e) {
        relativeY = (e.touches[0].pageY - pos.top);
        relativeX = (e.touches[0].pageX - pos.left);
      }

      // Attach data to element
      ripple.setAttribute('data-hold', Date.now());
      ripple.setAttribute('data-scale', scale);
      ripple.setAttribute('data-x', relativeX);
      ripple.setAttribute('data-y', relativeY);

      // Set ripple position
      var rippleStyle = {
        'top': relativeY + 'px',
        'left': relativeX + 'px'
      };

      ripple.className = ripple.className + ' waves-notransition';
      ripple.setAttribute('style', convertStyle(rippleStyle));
      ripple.className = ripple.className.replace('waves-notransition', '');

      // Scale the ripple
      rippleStyle['-webkit-transform'] = scale;
      rippleStyle['-moz-transform'] = scale;
      rippleStyle['-ms-transform'] = scale;
      rippleStyle['-o-transform'] = scale;
      rippleStyle.transform = scale;
      rippleStyle.opacity = '1';

      rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['transition-duration'] = Effect.duration + 'ms';

      rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

      ripple.setAttribute('style', convertStyle(rippleStyle));
    },

    hide: function (e) {
      TouchHandler.touchup(e);

      var el = this;
      var width = el.clientWidth * 1.4;

      // Get first ripple
      var ripple = null;
      var ripples = el.getElementsByClassName('waves-ripple');
      if (ripples.length > 0) {
        ripple = ripples[ripples.length - 1];
      } else {
        return false;
      }

      var relativeX = ripple.getAttribute('data-x');
      var relativeY = ripple.getAttribute('data-y');
      var scale = ripple.getAttribute('data-scale');

      // Get delay beetween mousedown and mouse leave
      var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
      var delay = 350 - diff;

      if (delay < 0) {
        delay = 0;
      }

      // Fade out ripple after delay
      setTimeout(function () {
        var style = {
          'top': relativeY + 'px',
          'left': relativeX + 'px',
          'opacity': '0',

          // Duration
          '-webkit-transition-duration': Effect.duration + 'ms',
          '-moz-transition-duration': Effect.duration + 'ms',
          '-o-transition-duration': Effect.duration + 'ms',
          'transition-duration': Effect.duration + 'ms',
          '-webkit-transform': scale,
          '-moz-transform': scale,
          '-ms-transform': scale,
          '-o-transform': scale,
          'transform': scale,
        };

        ripple.setAttribute('style', convertStyle(style));

        setTimeout(function () {
          try {
            el.removeChild(ripple);
          } catch (e) {
            return false;
          }
        }, Effect.duration);
      }, delay);
    },

    // Little hack to make <input> can perform waves effect
    wrapInput: function (elements) {
      for (var a = 0; a < elements.length; a++) {
        var el = elements[a];

        if (el.tagName.toLowerCase() === 'input') {
          var parent = el.parentNode;

          // If input already have parent just pass through
          if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
            continue;
          }

          // Put element class and style to the specified parent
          var wrapper = document.createElement('i');
          wrapper.className = el.className + ' waves-input-wrapper';

          var elementStyle = el.getAttribute('style');

          if (!elementStyle) {
            elementStyle = '';
          }

          wrapper.setAttribute('style', elementStyle);

          el.className = 'waves-button-input';
          el.removeAttribute('style');

          // Put element as child
          parent.replaceChild(wrapper, el);
          wrapper.appendChild(el);
        }
      }
    }
  };


  /**
   * Disable mousedown event for 500ms during and after touch
   */
  var TouchHandler = {
    /* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */
    touches: 0,
    allowEvent: function (e) {
      var allow = true;

      if (e.type === 'touchstart') {
        TouchHandler.touches += 1; //push
      } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        setTimeout(function () {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1; //pop after 500ms
          }
        }, 500);
      } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
        allow = false;
      }

      return allow;
    },
    touchup: function (e) {
      TouchHandler.allowEvent(e);
    }
  };


  /**
   * Delegated click handler for .waves-effect element.
   * returns null when .waves-effect element not in "click tree"
   */
  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }

    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentNode !== null) {
      if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
        element = target;
        break;
      }
      target = target.parentNode;
    }
    return element;
  }

  /**
   * Bubble the click and show effect if .waves-effect elem was found
   */
  function showEffect(e) {
    var element = getWavesEffectElement(e);

    if (element !== null) {
      Effect.show(e, element);

      if ('ontouchstart' in window) {
        element.addEventListener('touchend', Effect.hide, false);
        element.addEventListener('touchcancel', Effect.hide, false);
      }

      element.addEventListener('mouseup', Effect.hide, false);
      element.addEventListener('mouseleave', Effect.hide, false);
      element.addEventListener('dragend', Effect.hide, false);
    }
  }

  Waves.displayEffect = function (options) {
    options = options || {};

    if ('duration' in options) {
      Effect.duration = options.duration;
    }

    //Wrap input inside <i> tag
    Effect.wrapInput($$('.waves-effect'));

    if ('ontouchstart' in window) {
      document.body.addEventListener('touchstart', showEffect, false);
    }

    document.body.addEventListener('mousedown', showEffect, false);
  };

  /**
   * Attach Waves to an input element (or any element which doesn't
   * bubble mouseup/mousedown events).
   *   Intended to be used with dynamically loaded forms/inputs, or
   * where the user doesn't want a delegated click handler.
   */
  Waves.attach = function (element) {
    //FUTURE: automatically add waves classes and allow users
    // to specify them with an options param? Eg. light/classic/button
    if (element.tagName.toLowerCase() === 'input') {
      Effect.wrapInput([element]);
      element = element.parentNode;
    }

    if ('ontouchstart' in window) {
      element.addEventListener('touchstart', showEffect, false);
    }

    element.addEventListener('mousedown', showEffect, false);
  };

  window.Waves = Waves;

  document.addEventListener('DOMContentLoaded', function () {
    Waves.displayEffect();
  }, false);

})(window);



// Demo panel
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// loader 

var loader;

function loadNow(opacity) {
  if (opacity <= 0) {
    displayContent();
  } else {
    loader.style.opacity = opacity;
    window.setTimeout(function () {
      loadNow(opacity - 0.05);
    }, 50);
  }
}

function displayContent() {
  loader.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
  loader = document.getElementById('loader');
  loadNow(1);
});


new PerfectScrollbar(".multinav-scroll");


var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

$(document).ready(function () {
  $('#requestCashInput').hide();
  $('#registerNctsInput').hide();
  $('#conferenceregistrationInput').hide();
  $('.requestCash').change(function (event) {
    $('input[name="estimatecost"]').val('');
    event.target.value == 'yes' ? $('#requestCashInput').show().addClass('required') : $('#requestCashInput').hide().removeClass('required');
  });

  $('.registerNcts').change(function (event) {
    $('input[name="nctsEmail"]').val('');
    event.target.value == 'yes' ? $('#registerNctsInput').show().addClass('required') : $('#registerNctsInput').hide().removeClass('required');
  });

  $('.conferenceregistration').change(function (event) {
    $('input[name="conferenceregistrationfee"]').val('');
    event.target.value == 'yes' ? $('#conferenceregistrationInput').show().addClass('required') : $('#conferenceregistrationInput').hide().removeClass('required');
  });

  $('#allTravelTotal').val(0);

  $('#AirfareTrainAmount').val(0);
  $('#AirfareTrainDays').val(0);
  $('#AirfareTrainTotal').val(0);


  $('#AirfareTrainAmount').change(function (event) {
    $('#AirfareTrainTotal').val(event.target.value * $('#AirfareTrainDays').val());
    $('#allTravelTotal').val(
      parseFloat($('#AirfareTrainTotal').val()) +
      parseFloat($('#LodgingTotal').val()) +
      parseFloat($('#MieTotal').val()) +
      parseFloat($('#ConferenceTotal').val()) +
      parseFloat($('#AutomobileRentalTotal').val())
    );
  });
  $('#AirfareTrainDays').change(function (event) {
    $('#AirfareTrainTotal').val(event.target.value * $('#AirfareTrainAmount').val());
    $('#allTravelTotal').val(
      parseFloat($('#AirfareTrainTotal').val()) +
      parseFloat($('#LodgingTotal').val()) +
      parseFloat($('#MieTotal').val()) +
      parseFloat($('#ConferenceTotal').val()) +
      parseFloat($('#AutomobileRentalTotal').val())
    );
  });


  $('#LodgingAmount').val(0);
  $('#LodgingDays').val(0);
  $('#LodgingTotal').val(0);

  $('#LodgingAmount').change(function (event) {
    $('#LodgingTotal').val(event.target.value * $('#LodgingDays').val());
    $('#allTravelTotal').val(
      parseFloat($('#AirfareTrainTotal').val()) +
      parseFloat($('#LodgingTotal').val()) +
      parseFloat($('#MieTotal').val()) +
      parseFloat($('#ConferenceTotal').val()) +
      parseFloat($('#AutomobileRentalTotal').val())
    );
  });
  $('#LodgingDays').change(function (event) {
    $('#LodgingTotal').val(event.target.value * $('#LodgingAmount').val());
    $('#allTravelTotal').val(
      parseFloat($('#AirfareTrainTotal').val()) +
      parseFloat($('#LodgingTotal').val()) +
      parseFloat($('#MieTotal').val()) +
      parseFloat($('#ConferenceTotal').val()) +
      parseFloat($('#AutomobileRentalTotal').val())
    );
  });

  $('#MieAmount').val(0);
  $('#MieDays').val(0);
  $('#MieTotal').val(0);

  $('#MieAmount').change(function (event) {
    $('#MieTotal').val(event.target.value * $('#MieDays').val());
    $('#allTravelTotal').val(
      parseFloat($('#AirfareTrainTotal').val()) +
      parseFloat($('#LodgingTotal').val()) +
      parseFloat($('#MieTotal').val()) +
      parseFloat($('#ConferenceTotal').val()) +
      parseFloat($('#AutomobileRentalTotal').val())
    );
  });
  $('#MieDays').change(function (event) {
    $('#MieTotal').val(event.target.value * $('#MieAmount').val());
    $('#allTravelTotal').val(
      parseFloat($('#AirfareTrainTotal').val()) +
      parseFloat($('#LodgingTotal').val()) +
      parseFloat($('#MieTotal').val()) +
      parseFloat($('#ConferenceTotal').val()) +
      parseFloat($('#AutomobileRentalTotal').val())
    );
  });

  $('#ConferenceAmount').val(0);
  $('#ConferenceDays').val(0);
  $('#ConferenceTotal').val(0);

  $('#ConferenceAmount').change(function (event) {
    $('#ConferenceTotal').val(event.target.value * $('#ConferenceDays').val());
    $('#allTravelTotal').val(
      parseFloat($('#AirfareTrainTotal').val()) +
      parseFloat($('#LodgingTotal').val()) +
      parseFloat($('#MieTotal').val()) +
      parseFloat($('#ConferenceTotal').val()) +
      parseFloat($('#AutomobileRentalTotal').val())
    );
  });
  $('#ConferenceDays').change(function (event) {
    $('#ConferenceTotal').val(event.target.value * $('#ConferenceAmount').val());
    $('#allTravelTotal').val(
      parseFloat($('#AirfareTrainTotal').val()) +
      parseFloat($('#LodgingTotal').val()) +
      parseFloat($('#MieTotal').val()) +
      parseFloat($('#ConferenceTotal').val()) +
      parseFloat($('#AutomobileRentalTotal').val())
    );
  });

  $('#AutomobileRentalAmount').val(0);
  $('#AutomobileRentalDays').val(0);
  $('#AutomobileRentalTotal').val(0);

  $('#AutomobileRentalAmount').change(function (event) {
    $('#AutomobileRentalTotal').val(event.target.value * $('#AutomobileRentalDays').val());
    $('#allTravelTotal').val(
      parseFloat($('#AirfareTrainTotal').val()) +
      parseFloat($('#LodgingTotal').val()) +
      parseFloat($('#MieTotal').val()) +
      parseFloat($('#ConferenceTotal').val()) +
      parseFloat($('#AutomobileRentalTotal').val())
    );
  });
  $('#AutomobileRentalDays').change(function (event) {
    $('#AutomobileRentalTotal').val(event.target.value * $('#AutomobileRentalAmount').val());
    $('#allTravelTotal').val(
      parseFloat($('#AirfareTrainTotal').val()) +
      parseFloat($('#LodgingTotal').val()) +
      parseFloat($('#MieTotal').val()) +
      parseFloat($('#ConferenceTotal').val()) +
      parseFloat($('#AutomobileRentalTotal').val())
    );
  });

  $('#MilageAmount').change(function (event) {
    $('#MilageTotal').val(event.target.value * $('#MilageDays').val());
    $('#allTravelTotal').val(
      parseFloat($('#AirfareTrainTotal').val()) +
      parseFloat($('#LodgingTotal').val()) +
      parseFloat($('#MieTotal').val()) +
      parseFloat($('#ConferenceTotal').val()) +
      parseFloat($('#AutomobileRentalTotal').val()) +
      parseFloat($('#MilageTotal').val())
    );
  });

  $('#MilageAmount').val(0);
  $('#MilageDays').val(0);
  $('#MilageTotal').val(0);

  $('#MilageDays').change(function (event) {
    $('#MilageTotal').val(event.target.value * $('#MilageAmount').val());
    $('#allTravelTotal').val(
      parseFloat($('#AirfareTrainTotal').val()) +
      parseFloat($('#LodgingTotal').val()) +
      parseFloat($('#MieTotal').val()) +
      parseFloat($('#ConferenceTotal').val()) +
      parseFloat($('#AutomobileRentalTotal').val()) +
      parseFloat($('#MilageTotal').val())
    );
  });

  $('input.travelLocation').cityAutocomplete();

  $('input#employeeCode').change(function (event) {
    event.target.value = event.target.value.toString().padStart(6, '0')
    $.ajax({
      type: 'POST',
      url: "http://localhost:3000/request/getRequestDetails",
      data: { eid: event.target.value },
      error: function (error) {
        //console.log("error ", error);
      },
      success: function (resultgb) {
        for (var key in resultgb) {
          $('input[name=' + key + ']').val(resultgb[key])
        }
        $("textarea[name='tripJustification']").val(resultgb['tripJustification']);
        $("textarea[name='tripOrganization']").val(resultgb['tripOrganization']);
      }
    });
  });

  $('input#fname').keyup(function (event) {
    $.ajax({
      type: 'POST',
      url: "http://localhost:3000/request/getRequestList",
      data: { fname: event.target.value, lname: '' },
      error: function (error) {
        //console.log("error ", error);
      },
      success: async function (resultgb) {
        /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
        await autocompleteName(document.getElementById("fname"), resultgb, 'fname');
      }
    });
  });

  $('input#lname').keyup(function (event) {
    $.ajax({
      type: 'POST',
      url: "http://localhost:3000/request/getRequestList",
      data: { fname: '', lname: event.target.value },
      error: function (error) {
        //console.log("error ", error);
      },
      success: async function (resultgb) {
        /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
        await autocompleteName(document.getElementById("lname"), resultgb, 'lname');
      }
    });
  });

  $('button.deleteBtn').click(function (event) {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this record!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
      function () {
        $.ajax({
          type: 'POST',
          url: window.location.origin+"/"+window.location.pathname.split("/")[1]+"/delete",
          data: { id: $(event.target).attr('id') },
          error: function (error) {
          },
          success: async function (resultgb) {
            swal(
              {
                title: "Deleted!",
                text: "Your record has been deleted.",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ok",
                closeOnConfirm: true
              },
                function () {
                  window.location.href = window.location.origin +"/"+ window.location.pathname.split("/")[1];
                });
          }
        })
      }
    )
  });


  $('.tableList').DataTable({
    dom: 'Bfrtip',
    buttons: [
      'csv', 'excel', 'pdf', 'print',
      {
        text: 'Yaml',
        //   extends: 'excelHtml5',
        //   exportOptions: {
        //     rows: function ( idx, data, node ) {
        //         return data
        //                 [2] === 'London' ?
        //                 true : false;
        //     }
        // },
        action: function (e, dt, node, config) {
          let yaml = [];

          for (let i = 0; i < dt.data().length; i++) {
            yaml.push({
              fname: dt.data()[i][0].split(' ')[0],
              lname: dt.data()[i][0].split(' ')[1],
              role: dt.data()[i][1],
              employer: dt.data()[i][2],
              employeeCode: dt.data()[i][3],
              email: dt.data()[i][4],
              phone: dt.data()[i][5]
            })
          }
          console.log('Button activated', yaml);
        }
      }
    ]
  });

  function autocompleteName(inp, arr, nameItem) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false; }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i][nameItem].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i][nameItem].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i]['fname'].substr(val.length) + ' ' + arr[i]['lname'].substr(val.length);;
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i][nameItem] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            url = 'http://localhost:3000/request/';
            if (nameItem == 'fname') {
              url = url + 'getRequestFname'
            } else {
              url = url + 'getRequestLname'
            }
            $.ajax({
              type: 'POST',
              url: url,
              data: { eid: event.target.value },
              error: function (error) {
                //console.log("error ", error);
              },
              success: function (resultgb) {
                for (var key in resultgb) {
                  $('input[name=' + key + ']').val(resultgb[key])
                }
                $("input[name='AirfareTrainAmount']").val(resultgb['airfareTrainAmount']);
                $("input[name='AirfareTrainDays']").val(resultgb['airfareTrainDays']);
                $("input[name='AirfareTrainTotal']").val(resultgb['airfareTrainTotal']);
                $("input[name='LodgingAmount']").val(resultgb['lodgingAmount']);
                $("input[name='LodgingDays']").val(resultgb['lodgingDays']);
                $("input[name='LodgingTotal']").val(resultgb['lodgingTotal']);
                $("input[name='MieAmount']").val(resultgb['mieAmount']);
                $("input[name='MieDays']").val(resultgb['mieDays']);
                $("input[name='MieTotal']").val(resultgb['mieTotal']);
                $("input[name='ConferenceAmount']").val(resultgb['conferenceAmount']);
                $("input[name='ConferenceDays']").val(resultgb['conferenceDays']);
                $("input[name='ConferenceTotal']").val(resultgb['conferenceTotal']);
                $("input[name='AutomobileRentalAmount']").val(resultgb['automobileRentalAmount']);
                $("input[name='AutomobileRentalDays']").val(resultgb['automobileRentalDays']);
                $("input[name='AutomobileRentalTotal']").val(resultgb['automobileRentalTotal']);
                $("input[name='email']").val(resultgb['email']);
                $("input[name='phone']").val(resultgb['phone'])
                $("input[name='employeeCode']").val(resultgb['employeeCode'])
                $("textarea[name='tripJustification']").val(resultgb['tripJustification']);
                $("textarea[name='tripOrganization']").val(resultgb['tripOrganization']);
              }
            });
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });


  }

  var travelRowItem = $("#travelContainerEnd .tRow").length > 0 ? $("#travelContainerEnd .tRow").length - 1 : $("#travelContainerEnd .tRow").length
  $('#btnAddMoreTravelRow').click(function () {
    if (travelRowItem < 4) {
      $('#travelContainerEnd').append("<div class='row tRow'>" + $('#travelContainer').html() + "</div>");
      travelRowItem++;
    }
  });
  $(document).on('click', '.btnRemoveMoreTravelRow', function () {
    if (travelRowItem >= 1) {
      $(this).parent().parent().remove();
      travelRowItem--;
      console.log("test ", travelRowItem)
    }
  });
  $(document).on('focus', "input.travelLocation", function () {
    $(this).cityAutocomplete();
  });

  $("#btnApprove").click(() => {
    console.log($('.validation-wizard').serialize())
    swal({
      title: "Are you sure?",
      text: "You want to approve this request!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, approve it!",
      closeOnConfirm: false
    },
      function () {
    $.ajax({
      type: 'POST',
      url: $('.validation-wizard')[0].action,
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: $('.validation-wizard').serialize(),
      success: function () {
        swal({
          title: "Success",
          text: "This request is approved!",
          type: "success",
          showCancelButton: false,
          confirmButtonColor: "#7367F0",
          confirmButtonText: "OK",
          closeOnConfirm: true
        });
      },
      error: function () {
        swal({
          title: "Error",
          text: "This request is not approved!",
          type: "error",
          showCancelButton: false,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "OK",
          closeOnConfirm: true
        });
      }
    });

  })
  });

  $("#btnReject").click(() => {
    swal({
      title: "Are you sure?",
      text: "You want to reject this request!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, reject it!",
      closeOnConfirm: false
    },
      function () {
    $.ajax({
      type: 'POST',
      url: '/reject',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: { id: "" },
      success: function () {
        swal({
          title: "Success",
          text: "This request is rejected!",
          type: "success",
          showCancelButton: false,
          confirmButtonColor: "#7367F0",
          confirmButtonText: "OK",
          closeOnConfirm: true
        });
      },
      error: function () {
        swal({
          title: "Error",
          text: "This request is not rejected!",
          type: "error",
          showCancelButton: false,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "OK",
          closeOnConfirm: true
        });
      }
    })
  
  })

  });


});
