struct TriangleData {
    color: vec4f,
    offset: vec2f,
    scale: vec2f
};

@group(0) @binding(0) var<uniform> triangleData: TriangleData;

@vertex
fn set_triangle_points(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
    let coords = array<vec2f, 3>(
        vec2f(0, 0.5),
        vec2f(-0.7, -0.7),
        vec2f(0.7, -0.7)
    );

    return vec4f(
        coords[index] * triangleData.scale + triangleData.offset,
        0.0,
        1.0
    );
}

@fragment
fn set_triangle_color() -> @location(0) vec4f {
    return triangleData.color;
}
