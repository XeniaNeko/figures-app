import Point3D from '../entities/Point3D';
import Tetrahedron from '../entities/Tetrahedron';

const EPSILON = 1e-9;
const AXES = ['x', 'y', 'z'] as const;

type Vector = [number, number, number];

export default class TetrahedronCalculator {
  private vector(from: Point3D, to: Point3D): Vector {
    return [to.x - from.x, to.y - from.y, to.z - from.z];
  }

  private cross(a: Vector, b: Vector): Vector {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ];
  }

  private triangleArea(p: Point3D, q: Point3D, r: Point3D): number {
    const [cx, cy, cz] = this.cross(this.vector(p, q), this.vector(p, r));

    return Math.sqrt(cx * cx + cy * cy + cz * cz) / 2;
  }

  volume(tetra: Tetrahedron): number {
    const [a, b, c, d] = tetra.vertices;
    const [cx, cy, cz] = this.cross(this.vector(a, c), this.vector(a, d));
    const [bx, by, bz] = this.vector(a, b);

    return Math.abs(bx * cx + by * cy + bz * cz) / 6;
  }

  surfaceArea(tetra: Tetrahedron): number {
    const [a, b, c, d] = tetra.vertices;

    return this.triangleArea(a, b, c) + this.triangleArea(a, b, d)
      + this.triangleArea(a, c, d) + this.triangleArea(b, c, d);
  }

  isTetrahedron(tetra: Tetrahedron): boolean {
    return this.volume(tetra) > EPSILON;
  }

  isBaseOnCoordinatePlane(tetra: Tetrahedron): boolean {
    return tetra.vertices.some((_, skipped) => {
      const face = tetra.vertices.filter((__, i) => i !== skipped);

      return AXES.some((axis) => face.every((p) => p[axis] === 0));
    });
  }

  private lerp(p: Point3D, q: Point3D, axis: 'x' | 'y' | 'z'): Point3D {
    const t = (0 - p[axis]) / (q[axis] - p[axis]);

    return new Point3D(
      p.x + t * (q.x - p.x),
      p.y + t * (q.y - p.y),
      p.z + t * (q.z - p.z),
    );
  }

  private tetraVolume(a: Point3D, b: Point3D, c: Point3D, d: Point3D): number {
    return this.volume(new Tetrahedron('tmp', [a, b, c, d]));
  }

  volumeRatio(tetra: Tetrahedron, axis: 'x' | 'y' | 'z'): number | null {
    const pos = tetra.vertices.filter((p) => p[axis] > 0);
    const neg = tetra.vertices.filter((p) => p[axis] < 0);
    const zero = tetra.vertices.filter((p) => p[axis] === 0);

    if (pos.length === 0 || neg.length === 0) {
      return null;
    }

    const [few, many] = pos.length <= neg.length ? [pos, neg] : [neg, pos];
    let part = 0;

    if (few.length === 1) {
      const points = [...zero, ...many.map((m) => this.lerp(few[0], m, axis))];
      part = this.tetraVolume(few[0], points[0], points[1], points[2]);
    } else {
      const [a, b] = few;
      const [c, d] = many;
      const ac = this.lerp(a, c, axis);
      const ad = this.lerp(a, d, axis);
      const bc = this.lerp(b, c, axis);
      const bd = this.lerp(b, d, axis);
      part = this.tetraVolume(a, b, ac, ad)
        + this.tetraVolume(b, ac, ad, bc)
        + this.tetraVolume(b, ad, bc, bd);
    }

    const total = this.volume(tetra);

    return part / (total - part);
  }
}
