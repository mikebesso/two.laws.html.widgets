#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
CalendarHeatmap <- function(message, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    message = message
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'CalendarHeatmap',
    x,
    width = width,
    height = height,
    package = 'two.laws.html.widgets',
    elementId = elementId
  )
}

#' Shiny bindings for CalendarHeatmap
#'
#' Output and render functions for using CalendarHeatmap within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a CalendarHeatmap
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name CalendarHeatmap-shiny
#'
#' @export
CalendarHeatmapOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'CalendarHeatmap', width, height, package = 'two.laws.html.widgets')
}

#' @rdname CalendarHeatmap-shiny
#' @export
renderCalendarHeatmap <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, CalendarHeatmapOutput, env, quoted = TRUE)
}
