

#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
FirstWidget <- function(message, width = NULL, height = NULL, elementId = NULL) {

  # forward options using params
  params = list(
    message = message
  )

  # create widget
  Widget <- htmlwidgets::createWidget(
    name = 'FirstWidget',
    params,
    width = width,
    height = height,
    package = 'two.laws.html.widgets',
    elementId = elementId
  )

  # Add 'FirstWidget' to the class list of this widget at the last but one position
  numClasses <- length(class(Widget))
  class(Widget) <- c(class(Widget)[1:(numClasses-1)],
                     'FirstWidget', class(Widget)[[numClasses]])

  return(Widget)
}

#' Shiny bindings for FirstWidget
#'
#' Output and render functions for using FirstWidget within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a FirstWidget
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name FirstWidget-shiny
#'
#' @export
FirstWidgetOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'FirstWidget', width, height, package = 'two.laws.html.widgets')
}

#' @rdname FirstWidget-shiny
#' @export
renderFirstWidget <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, FirstWidgetOutput, env, quoted = TRUE)
}





# TODO:
#   consider overriding print
