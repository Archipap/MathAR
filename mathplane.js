AFRAME.registerGeometry('mathplane', {

  schema: {
    mathfunc: {type: 'string', default: '0'}
  },

  init: function (data) {

    var geometry = new THREE.BufferGeometry();

    var indices = [];
    var vertices = [];
    var normals = [];
    var colors = [];

    var size = 30;
    var segments = 100;

    var halfSize = size / 2;
    var segmentSize = size / segments;

    var functionTree = math.parse(data.mathfunc);

    for ( var i = 0; i <= segments; i ++ ) {

      var z = ( i * segmentSize ) - halfSize;

      for ( var j = 0; j <= segments; j ++ ) {

        var x = ( j * segmentSize ) - halfSize;

        var values = {};
        values["x"] = x;
        values["z"] = z;
        var y = functionTree.evaluate(values);

        vertices.push( x, y, z );
        normals.push( 0, 0, 1 );

        var r = ( x / size ) + 0.5;
        var g = ( y / size ) + 0.5;
        var b = ( z / size ) + 0.5;

        colors.push( r, g, b );

      }

    }

    for ( var i = 0; i < segments; i ++ ) {

      for ( var j = 0; j < segments; j ++ ) {

        var a = i * ( segments + 1 ) + ( j + 1 );
        var b = i * ( segments + 1 ) + j;
        var c = ( i + 1 ) * ( segments + 1 ) + j;
        var d = ( i + 1 ) * ( segments + 1 ) + ( j + 1 );

        indices.push( a, b, d );
        indices.push( b, c, d );

      }

    }

    geometry.setIndex( indices );
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    this.geometry = geometry;

  }

});