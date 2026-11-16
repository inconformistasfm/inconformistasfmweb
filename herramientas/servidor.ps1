# Servidor local para comprobar la web en tu ordenador (sin instalar nada).
$raiz = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$puerto = 8000
$prefijo = "http://localhost:$puerto/"
$http = New-Object System.Net.HttpListener
$http.Prefixes.Add($prefijo)
try { $http.Start() } catch {
  Write-Host "No se pudo iniciar en el puerto $puerto. Cierra otras ventanas de este servidor e intentalo de nuevo."
  Read-Host "Pulsa Intro para salir"
  exit
}
Write-Host "Web de Inconformistas FM funcionando en $prefijo"
Write-Host "Se abrira el navegador. Para parar, cierra esta ventana."
Start-Process $prefijo
$tipos = @{
  ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8"; ".js"="application/javascript; charset=utf-8";
  ".json"="application/json; charset=utf-8"; ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg";
  ".webp"="image/webp"; ".gif"="image/gif"; ".svg"="image/svg+xml"; ".ico"="image/x-icon";
  ".xml"="application/xml"; ".txt"="text/plain; charset=utf-8"; ".mp3"="audio/mpeg"
}
while ($http.IsListening) {
  $ctx = $http.GetContext()
  try {
    $ruta = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
    $archivo = Join-Path $raiz ($ruta.TrimStart('/') -replace '/','\')
    if (Test-Path $archivo -PathType Container) { $archivo = Join-Path $archivo "index.html" }
    if (Test-Path $archivo -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($archivo).ToLower()
      $ct = $tipos[$ext]
      if (-not $ct) { $ct = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($archivo)
      $ctx.Response.ContentType = $ct
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
    }
  } catch { }
  $ctx.Response.Close()
}
