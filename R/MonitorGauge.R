
# http://bl.ocks.org/tomerd/1499279

#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
MonitorGauge <- function(message, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    message = message
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'MonitorGauge',
    x,
    width = width,
    height = height,
    package = 'two.laws.html.widgets',
    elementId = elementId
  )
}

#' Shiny bindings for MonitorGauge
#'
#' Output and render functions for using MonitorGauge within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a MonitorGauge
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name MonitorGauge-shiny
#'
#' @export
MonitorGaugeOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'MonitorGauge', width, height, package = 'two.laws.html.widgets')
}

#' @rdname MonitorGauge-shiny
#' @export
renderMonitorGauge <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, MonitorGaugeOutput, env, quoted = TRUE)
}
