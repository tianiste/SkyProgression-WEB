// Minimal reader for the gzipped, base64 NBT that Hypixel uses for inventories.

export type Nbt = number | bigint | string | Nbt[] | { [key: string]: Nbt } | Int8Array | Int32Array | BigInt64Array;

class Reader {
  private view: DataView;
  private at = 0;
  private text = new TextDecoder();
  constructor(private bytes: Uint8Array) {
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  }
  u8() {
    return this.view.getUint8(this.at++);
  }
  i8() {
    return this.view.getInt8(this.at++);
  }
  i16() {
    const v = this.view.getInt16(this.at);
    this.at += 2;
    return v;
  }
  u16() {
    const v = this.view.getUint16(this.at);
    this.at += 2;
    return v;
  }
  i32() {
    const v = this.view.getInt32(this.at);
    this.at += 4;
    return v;
  }
  i64() {
    const v = this.view.getBigInt64(this.at);
    this.at += 8;
    return v;
  }
  f32() {
    const v = this.view.getFloat32(this.at);
    this.at += 4;
    return v;
  }
  f64() {
    const v = this.view.getFloat64(this.at);
    this.at += 8;
    return v;
  }
  str() {
    const n = this.u16();
    const s = this.text.decode(this.bytes.subarray(this.at, this.at + n));
    this.at += n;
    return s;
  }
  payload(type: number, depth = 0): Nbt {
    if (depth > 64) throw new Error("NBT nested too deep");
    switch (type) {
      case 1:
        return this.i8();
      case 2:
        return this.i16();
      case 3:
        return this.i32();
      case 4:
        return this.i64();
      case 5:
        return this.f32();
      case 6:
        return this.f64();
      case 7: {
        const n = this.i32();
        const a = new Int8Array(this.bytes.slice(this.at, this.at + n));
        this.at += n;
        return a;
      }
      case 8:
        return this.str();
      case 9: {
        const t = this.u8();
        const n = this.i32();
        const out: Nbt[] = [];
        for (let i = 0; i < n; i++) out.push(this.payload(t, depth + 1));
        return out;
      }
      case 10: {
        const out: { [key: string]: Nbt } = {};
        for (let t = this.u8(); t !== 0; t = this.u8()) out[this.str()] = this.payload(t, depth + 1);
        return out;
      }
      case 11: {
        const n = this.i32();
        const a = new Int32Array(n);
        for (let i = 0; i < n; i++) a[i] = this.i32();
        return a;
      }
      case 12: {
        const n = this.i32();
        const a = new BigInt64Array(n);
        for (let i = 0; i < n; i++) a[i] = this.i64();
        return a;
      }
      default:
        throw new Error("Unknown NBT tag " + type);
    }
  }
  root(): Nbt {
    const t = this.u8();
    this.str();
    return this.payload(t);
  }
}

/** Decodes Hypixel's base64 + gzip NBT ("data" fields of profile inventories). */
export async function decodeNbt(base64: string): Promise<Nbt> {
  const bin = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const stream = new Blob([bin]).stream().pipeThrough(new DecompressionStream("gzip"));
  const bytes = new Uint8Array(await new Response(stream).arrayBuffer());
  return new Reader(bytes).root();
}
