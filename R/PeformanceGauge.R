#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
PeformanceGauge <- function(message, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    message = message
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'PeformanceGauge',
    x,
    width = width,
    height = height,
    package = 'two.laws.html.widgets',
    elementId = elementId
  )
}

#' Shiny bindings for PeformanceGauge
#'
#' Output and render functions for using PeformanceGauge within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a PeformanceGauge
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name PeformanceGauge-shiny
#'
#' @export
PeformanceGaugeOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'PeformanceGauge', width, height, package = 'two.laws.html.widgets')
}

#' @rdname PeformanceGauge-shiny
#' @export
renderPeformanceGauge <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, PeformanceGaugeOutput, env, quoted = TRUE)
}
