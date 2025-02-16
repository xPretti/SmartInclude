import path from "path";

export function inIncludePath(includePath: string, currentPath: string, targetPath: string): boolean {
    if (!currentPath.includes(includePath) && targetPath.includes(includePath)) {
        return true;
    }
    if (currentPath.includes(includePath) && targetPath.includes(includePath)) {
        const targetParts = cleanPath(targetPath, includePath);
        const currentParts = cleanPath(currentPath, includePath);
        return targetParts[0] !== currentParts[0];
    }
    return false;
}

export function cleanPath(pathValue: string, includePath: string): string[] {
    const separator = path.sep;
    if (includePath.length === 0) {
        return toWindowsSlash(pathValue).split(separator);
    }
    return toWindowsSlash(pathValue)
        .replace(toWindowsSlash(addTrailingSlash(includePath)), "")
        .split(separator);
}

export function addTrailingSlash(filePath: string): string {
    const separator = path.sep;
    if (!filePath.endsWith(separator)) {
        return filePath + separator;
    }
    return filePath;
}

export function removeTrailingSlash(filePath: string): string {
    return filePath.replace(/[\\/]+$/, '');
}

export function toWindowsSlash(filePath: string): string {
    return filePath.replace(/\//g, path.sep);
}

export function toLinuxSlash(filePath: string): string {
    return filePath.replace(/\\/g, '/');
}

export function toSystemSlash(filePath: string): string {
    const isWindows = process.platform === 'win32';
    if (isWindows) {
        return toWindowsSlash(filePath);
    }
    return filePath.replace(/\\/g, path.sep);
}
