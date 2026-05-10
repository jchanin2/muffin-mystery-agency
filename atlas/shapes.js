// shapes.js — A library of named shapes Jacob can be asked to identify
// or sort. Each entry has an SVG path and a list of property tags so
// challenges can ask "click all the trapezoids" or "drag each shape to
// its category" without re-defining geometry.

const SHAPES = {
  // ===== QUADRILATERALS =====
  square_1:        { svg: '<polygon points="20,20 80,20 80,80 20,80" />',                                tags: ['quadrilateral','parallelogram','rectangle','rhombus','square'],            category: 'square'        },
  square_2:        { svg: '<polygon points="30,30 70,30 70,70 30,70" />',                                tags: ['quadrilateral','parallelogram','rectangle','rhombus','square'],            category: 'square'        },

  rectangle_1:     { svg: '<polygon points="10,28 90,28 90,72 10,72" />',                                tags: ['quadrilateral','parallelogram','rectangle'],                                category: 'rectangle'     },
  rectangle_2:     { svg: '<polygon points="35,8 65,8 65,92 35,92" />',                                  tags: ['quadrilateral','parallelogram','rectangle'],                                category: 'rectangle'     },

  rhombus_1:       { svg: '<polygon points="50,10 90,50 50,90 10,50" />',                               tags: ['quadrilateral','parallelogram','rhombus'],                                  category: 'rhombus'       },
  rhombus_2:       { svg: '<polygon points="20,30 80,30 60,70 0,70" transform="translate(10,0)" />',     tags: ['quadrilateral','parallelogram','rhombus'],                                  category: 'rhombus'       },

  parallelogram_1: { svg: '<polygon points="20,30 80,30 70,70 10,70" transform="translate(10,0)" />',    tags: ['quadrilateral','parallelogram'],                                            category: 'parallelogram' },
  parallelogram_2: { svg: '<polygon points="15,28 85,40 80,72 10,60" />',                                tags: ['quadrilateral','parallelogram'],                                            category: 'parallelogram' },

  trapezoid_1:     { svg: '<polygon points="20,75 80,75 65,25 35,25" />',                                tags: ['quadrilateral','trapezoid'],                                                category: 'trapezoid'     },
  trapezoid_2:     { svg: '<polygon points="10,30 90,30 75,75 25,75" />',                                tags: ['quadrilateral','trapezoid'],                                                category: 'trapezoid'     },
  trapezoid_3:     { svg: '<polygon points="20,80 80,80 50,20 30,20" />',                                tags: ['quadrilateral','trapezoid'],                                                category: 'trapezoid'     },

  kite_1:          { svg: '<polygon points="50,10 80,40 50,90 20,40" />',                               tags: ['quadrilateral','kite'],                                                     category: 'kite'          },

  irreg_quad_1:    { svg: '<polygon points="15,28 75,18 88,68 25,82" />',                                tags: ['quadrilateral'],                                                            category: 'quadrilateral' },

  // ===== TRIANGLES =====
  tri_equilateral: { svg: '<polygon points="50,12 88,82 12,82" />',                                       tags: ['triangle','equilateral','acute'],                                           category: 'triangle'      },
  tri_isosceles:   { svg: '<polygon points="50,12 75,80 25,80" />',                                       tags: ['triangle','isosceles','acute'],                                             category: 'triangle'      },
  tri_scalene:     { svg: '<polygon points="20,82 88,72 60,15" />',                                       tags: ['triangle','scalene','acute'],                                               category: 'triangle'      },
  tri_right_1:     { svg: '<polygon points="15,15 15,82 80,82" />',                                       tags: ['triangle','right'],                                                         category: 'triangle'      },
  tri_right_2:     { svg: '<polygon points="80,15 80,82 15,82" />',                                       tags: ['triangle','right','isosceles'],                                             category: 'triangle'      },
  tri_obtuse:      { svg: '<polygon points="15,80 30,30 90,80" />',                                       tags: ['triangle','obtuse','scalene'],                                              category: 'triangle'      },

  // ===== OTHER POLYGONS =====
  pentagon_1:      { svg: '<polygon points="50,10 88,40 72,86 28,86 12,40" />',                          tags: ['polygon','pentagon'],                                                       category: 'pentagon'      },
  hexagon_1:       { svg: '<polygon points="25,12 75,12 92,50 75,88 25,88 8,50" />',                     tags: ['polygon','hexagon'],                                                        category: 'hexagon'       }
};

// Render a single named shape as SVG markup
function renderShape(name, fillColor) {
  const shape = SHAPES[name];
  if (!shape) return '';
  const fill = fillColor || '#aa8838';
  const stroke = '#3a2010';
  return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
         '<g fill="' + fill + '" stroke="' + stroke + '" stroke-width="2.5" stroke-linejoin="round">' +
         shape.svg +
         '</g></svg>';
}

// Render a small inline version (for bin contents)
function renderShapeMini(name) {
  return renderShape(name, '#aa8838');
}

// Returns true if shape has the given tag
function shapeHasTag(name, tag) {
  const s = SHAPES[name];
  return !!(s && s.tags.indexOf(tag) >= 0);
}

// Friendly display name for a tag/category
const CATEGORY_LABELS = {
  square: 'Square',
  rectangle: 'Rectangle',
  rhombus: 'Rhombus',
  parallelogram: 'Parallelogram',
  trapezoid: 'Trapezoid',
  kite: 'Kite',
  quadrilateral: 'Other Quadrilateral',
  triangle: 'Triangle',
  pentagon: 'Pentagon',
  hexagon: 'Hexagon',
  acute: 'Acute Triangle',
  right: 'Right Triangle',
  obtuse: 'Obtuse Triangle',
  equilateral: 'Equilateral',
  isosceles: 'Isosceles',
  scalene: 'Scalene'
};

if (typeof window !== 'undefined') {
  window.SHAPES = SHAPES;
  window.renderShape = renderShape;
  window.renderShapeMini = renderShapeMini;
  window.shapeHasTag = shapeHasTag;
  window.CATEGORY_LABELS = CATEGORY_LABELS;
}
