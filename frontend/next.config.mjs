/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Разрешаем дев-режим со всех устройств локальной сети
  allowedDevOrigins: ["localhost", "100.77.118.45"],
};

export default nextConfig;
