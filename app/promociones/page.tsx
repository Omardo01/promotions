"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

export default function Inicio() {

  // Inicilizando variables (estados)
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState('')
  const [peso, setPeso] = useState<number | null>(null)
  const [edad, setEdad] = useState<number | null>(null)
  

  // Función para calcular la edad
  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const diferenciaMes = hoy.getMonth() - nacimiento.getMonth()
    if (diferenciaMes < 0 || (diferenciaMes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad
  }

  // Función para manejar el envío del formulario
  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault()
    const edadCalculada = calcularEdad(fechaDeNacimiento)
    setEdad(edadCalculada)
  }

  // Función para obtener la promoción según la edad
  const obtenerPromocion = (edad: number) => {
    
    if (edad > 40) return "20% de descuento en Opticavisión"
    if (edad >= 15 && edad <= 20) return "15% de descuento en boliche"
    if (edad > 20 && edad <= 40) return "10% de descuento en Rodizio"
    if (edad < 15) return "15% de descuento en Burger King"
    return "No hay promociones disponibles"
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto bg-slate-100 mt-5">
        <CardHeader>
          <CardTitle>Promociones</CardTitle>
        </CardHeader>
        <CardContent>
           {/* Formulario para ingresar los datos */}
          <form onSubmit={manejarEnvio} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="peso">Peso en KG (redondeado)</Label>
              <Input
                id="peso"
                type="number"
                value={peso !== null ? peso.toString() : ''}
                onChange={(e) => setPeso(e.target.value ? parseInt(e.target.value) : null)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaDeNacimiento">Fecha de Nacimiento</Label>
              <Input
                id="fechaDeNacimiento"
                type="date"
                value={fechaDeNacimiento}
                onChange={(e) => setFechaDeNacimiento(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Calcular Edad</Button>
          </form>
        </CardContent>
      </Card>

      {edad !== null && (
        <Card className="w-full max-w-md mx-auto mt-4">
          <CardHeader>
            <CardTitle>Tu promoción</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-2">¡Hola, {nombre} {apellido}!</p>
            <p className="mb-4">Tu edad: {edad} años</p>
            <p className="text-xl font-semibold">{obtenerPromocion(edad)}</p>
          </CardContent>
        </Card>
      )}

        <Link href="/" className="block w-full">
          <Button className="w-full mt-5 text-lg py-6" size="lg">
            Home
          </Button>
        </Link>
    </div>
    
  )
}

