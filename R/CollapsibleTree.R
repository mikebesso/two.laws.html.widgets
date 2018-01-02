#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
CollapsibleTree <- function(message, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    message = message
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'CollapsibleTree',
    x,
    width = width,
    height = height,
    package = 'two.laws.html.widgets',
    elementId = elementId
  )
}

#' Shiny bindings for CollapsibleTree
#'
#' Output and render functions for using CollapsibleTree within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a CollapsibleTree
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name CollapsibleTree-shiny
#'
#' @export
CollapsibleTreeOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'CollapsibleTree', width, height, package = 'two.laws.html.widgets')
}

#' @rdname CollapsibleTree-shiny
#' @export
renderCollapsibleTree <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, CollapsibleTreeOutput, env, quoted = TRUE)
}
