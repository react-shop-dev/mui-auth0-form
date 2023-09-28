const formatRegExp = /%[sdj%]/g;

export const formatMessages = (message: string, format: number[] = []) => {
  let i = 0;

  let str = String(message).replace(formatRegExp, (x: string) => {
    if (x === '%%') return '%';
    if (i >= format.length) return x;
    switch (x) {
      case '%s':
        return String(format[i++]);
      case '%d':
        return `${Number(format[i++])}`;
      case '%j':
        try {
          return JSON.stringify(format[0]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });

  for (let x = format[i]; i < format.length; x = format[++i]) {
    if (x === null || !isObject(x)) {
      str += ` ${x}`;
    } else if (x !== null) {
      str += ` ${JSON.stringify(x)}`;
    }
  }
  return str;
};

export const isObject = (object: any) =>
  object && Object.prototype.toString.call(object) === '[object Object]';
