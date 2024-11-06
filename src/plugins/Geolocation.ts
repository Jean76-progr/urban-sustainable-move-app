import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

export async function getCurrentPosition() {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
  } catch (error) {
    console.error('Error getting location', error);
    throw error;
  }
}