#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
PowerGauge <- function(value, min, max, width = NULL, height = NULL, elementId = NULL) {

  # forward options using params
  params = list(
    value = value,
    min = min,
    max = max
  )

  # create widget
  Widget <- htmlwidgets::createWidget(
    name = 'PowerGauge',
    params,
    width = width,
    height = height,
    package = 'two.laws.html.widgets',
    elementId = elementId
  )

  return(Widget)
}

#' Shiny bindings for PowerGauge
#'
#' Output and render functions for using PowerGauge within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a PowerGauge
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name PowerGauge-shiny
#'
#' @export
PowerGaugeOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'PowerGauge', width, height, package = 'two.laws.html.widgets')
}

#' @rdname PowerGauge-shiny
#' @export
renderPowerGauge <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, PowerGaugeOutput, env, quoted = TRUE)
}
