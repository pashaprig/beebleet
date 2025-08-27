import type { TAspectRatioOption } from "@/types/image-types";

export const MIN_DIMENSION = 150;
export const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/svg+xml'];
export const FORMAT_EXTENSIONS = '.jpg, .jpeg, .png, .svg';

export const ASPECT_RATIO_OPTIONS: TAspectRatioOption[] = [
  { value: 1, label: '1:1' },    // Square
  { value: 16 / 9, label: '16:9' }, // Widescreen
  { value: 4 / 3, label: '4:3' }    // Standard
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes