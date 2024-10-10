@vertex
fn set_triangle_points(@location(0) coord: vec2f) -> @builtin(position) vec4f {
    return vec4f(coord.x, coord.y, 0.0, 1.0);
}


@fragment
fn set_triangle_color(@builtin(position) position: vec4f) -> @location(0) vec4f {
    return vec4f(0.3, 0.4, 0.7, 1.0);
}