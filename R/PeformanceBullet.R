# https://bl.ocks.org/mbostock/4061961


#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
PerformanceBullet <- function(
  title,
  subtitle = "",
  unsuccessful = 2,
  building = 4,
  successful = 6,
  outstanding = 8,
  exceptional = 10,
  value = 5,
  target = 6,
  minValue = 0,
  maxValue = max(value, target, exceptional) + 2,
  width = NULL,
  height = NULL,
  elementId = NULL
) {

  # forward options using x
  params = list(
    title = title,
    subtitle = subtitle,
    unsuccessful = unsuccessful,
    building = building,
    successful = successful,
    outstanding = outstanding,
    exceptional = exceptional,
    value = value,
    target = target,
    minValue = minValue,
    maxValue = maxValue
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'PeformanceBullet',
    params,
    width = width,
    height = height,
    package = 'two.laws.html.widgets',
    elementId = elementId
  )
}

#' Shiny bindings for PeformanceBullet
#'
#' Output and render functions for using PeformanceBullet within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a PeformanceBullet
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name PeformanceBullet-shiny
#'
#' @export
PeformanceBulletOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'PeformanceBullet', width, height, package = 'two.laws.html.widgets')
}

#' @rdname PeformanceBullet-shiny
#' @export
renderPeformanceBullet <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, PeformanceBulletOutput, env, quoted = TRUE)
}
