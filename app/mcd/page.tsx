"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus, Minus } from "lucide-react"
import Link from 'next/link'

export default function Componente() {
  // Estado para manejar los números ingresados
  const [numeros, setNumeros] = useState(['', ''])
  // Estados para almacenar los resultados de los diferentes métodos de MCD
  const [resultadoTradicional, setResultadoTradicional] = useState<number | null>(null)
  const [resultadoEuclides, setResultadoEuclides] = useState<number | null>(null)
  const [resultadoFactoresPrimos, setResultadoFactoresPrimos] = useState<number | null>(null)
  // Estados para almacenar el tiempo que tomó cada método
  const [tiempoTradicional, setTiempoTradicional] = useState<number | null>(null)
  const [tiempoEuclides, setTiempoEuclides] = useState<number | null>(null)
  const [tiempoFactoresPrimos, setTiempoFactoresPrimos] = useState<number | null>(null)

  // Función para agregar un campo de número adicional
  const agregarCampoNumero = () => {
    setNumeros([...numeros, ''])
  }

  // Función para remover un campo de número específico
  const removerCampoNumero = (indice: number) => {
    if (numeros.length > 2) {
      const nuevosNumeros = numeros.filter((_, i) => i !== indice)
      setNumeros(nuevosNumeros)
    }
  }

  // Función para manejar los cambios en los campos de número
  const manejarCambioNumero = (indice: number, valor: string) => {
    const nuevosNumeros = [...numeros]
    nuevosNumeros[indice] = valor
    setNumeros(nuevosNumeros)
  }


  // METODO 1 - TRADICIONAL XXXXXXXXXXXXXXXXXX

  // Función para calcular el MCD utilizando el método tradicional
  const calcularMCDTradicional = () => {
    // Convierte los números ingresados a valores absolutos, los convierte a enteros y filtra cualquier valor no numérico (NaN).
    const numerosValidos = numeros
      .map(num => Math.abs(parseInt(num)))
      .filter(num => !isNaN(num))

    // Si hay menos de 2 números válidos, se reinician los resultados y se termina la ejecución de la función.
    if (numerosValidos.length < 2) {
      setResultadoTradicional(null)
      setTiempoTradicional(null)
      return
    }

    // Marca el tiempo de inicio para medir cuánto tiempo toma calcular el MCD.
    const tiempoInicio = performance.now()

    // Función interna para encontrar el MCD de dos números usando el método tradicional.
    // Comienza desde el menor de los dos números y verifica todos los divisores posibles.
    const encontrarMCD = (a: number, b: number): number => {
      const menor = Math.min(a, b) // Encuentra el menor de los dos números.
      for (let i = menor; i > 0; i--) { // Itera desde el menor número hacia 1.
        if (a % i === 0 && b % i === 0) { // Si 'i' divide a ambos números sin residuo, entonces es el MCD.
          return i
        }
      }
      return 1 // Si no se encuentra otro divisor, el MCD es 1.
    }

    // Inicializa 'resultado' con el primer número válido.
    let resultado = numerosValidos[0]
    
    // Itera sobre el resto de los números válidos y encuentra el MCD acumulado.
    for (let i = 1; i < numerosValidos.length; i++) {
      resultado = encontrarMCD(resultado, numerosValidos[i])
    }

    // Marca el tiempo de fin y calcula el tiempo total que tomó el cálculo.
    const tiempoFin = performance.now()
    
    // Actualiza el estado con el resultado del MCD calculado.
    setResultadoTradicional(resultado)
    
    // Actualiza el estado con el tiempo que tomó el cálculo.
    setTiempoTradicional(tiempoFin - tiempoInicio)
  }


// METODO 2 - EUCLIDES XXXXXXXXXXXXXXXXXX

  // Función para calcular el MCD utilizando el método de Euclides
  const calcularMCDEuclides = () => {
    const numerosValidos = numeros
      .map(num => Math.abs(parseInt(num)))
      .filter(num => !isNaN(num))
  
    if (numerosValidos.length < 2) {
      setResultadoEuclides(null)
      setTiempoEuclides(null)
      return
    }
  
    const tiempoInicio = performance.now()
  
    // Adaptando el algoritmo de Euclides como en la imagen
    const encontrarMCD = (a: number, b: number): number => {
      while (a !== b) { // Mientras a no sea igual a b
        if (a > b) { // Si a es mayor que b
          a = a - b; // Resta b de a
        } else { // Si b es mayor que a
          b = b - a; // Resta a de b
        }
      }
      return a; // Retorna el MCD cuando a es igual a b
    }
  
    let resultado = numerosValidos[0]
    for (let i = 1; i < numerosValidos.length; i++) {
      resultado = encontrarMCD(resultado, numerosValidos[i])
    }
  
    const tiempoFin = performance.now()
    setResultadoEuclides(resultado)
    setTiempoEuclides(tiempoFin - tiempoInicio)
  }
  

// METODO 3 - FACTORES PRIMOS XXXXXXXXXXXXXXXXXX

  // Función para calcular el MCD utilizando el método de factores primos
  const calcularMCDFactoresPrimos = () => {
    // Convertimos los números ingresados a valores absolutos, los convertimos a enteros y filtramos cualquier valor que no sea un número (NaN).
    const numerosValidos = numeros
      .map(num => Math.abs(parseInt(num)))
      .filter(num => !isNaN(num))
  
    // Si hay menos de 2 números válidos, se reinician los resultados y se termina la ejecución de la función.
    if (numerosValidos.length < 2) {
      setResultadoFactoresPrimos(null)
      setTiempoFactoresPrimos(null)
      return
    }
  
    // Marca el tiempo de inicio para medir cuánto tiempo toma calcular el MCD utilizando el método de factores primos.
    const tiempoInicio = performance.now()
  
    // Función para obtener los factores primos de un número.
    // Se utiliza un divisor inicial de 2 y se va dividiendo el número mientras sea divisible.
    const obtenerFactoresPrimos = (num: number): number[] => {
      const factores: number[] = [] // Lista donde se almacenarán los factores primos
      let divisor = 2 // El divisor inicial es 2, el primer número primo
      while (num > 1) { // Mientras el número sea mayor a 1
        if (num % divisor === 0) { // Si el número es divisible por el divisor actual
          factores.push(divisor) // Añadimos el divisor a la lista de factores primos
          num /= divisor // Dividimos el número por el divisor para reducirlo
        } else {
          divisor++ // Si no es divisible, incrementamos el divisor para probar el siguiente número
        }
      }
      return factores // Retornamos la lista de factores primos obtenidos
    }
  
    // Obtenemos las listas de factores primos para cada número válido
    const listasFactoresPrimos = numerosValidos.map(obtenerFactoresPrimos)
    const factoresComunes: number[] = [] // Lista para almacenar los factores comunes
  
    // Recorremos la lista de factores del primer número mientras tenga elementos
    while (listasFactoresPrimos[0].length > 0) {
      const factor = listasFactoresPrimos[0][0] // Tomamos el primer factor de la primera lista
      // Verificamos si este factor está presente en todas las listas de factores
      if (listasFactoresPrimos.every(lista => lista.includes(factor))) {
        // Si es común en todas las listas, lo añadimos a la lista de factores comunes
        factoresComunes.push(factor)
        // Eliminamos este factor de todas las listas para evitar contarlo nuevamente
        listasFactoresPrimos.forEach(lista => {
          const index = lista.indexOf(factor)
          if (index !== -1) {
            lista.splice(index, 1) // Eliminamos el factor encontrado
          }
        })
      } else {
        // Si el factor no es común en todas las listas, lo eliminamos solo de la primera lista
        listasFactoresPrimos[0].splice(0, 1)
      }
    }
  
    // Calculamos el MCD multiplicando todos los factores comunes encontrados
    const resultado = factoresComunes.reduce((a, b) => a * b, 1)
  
    // Marca el tiempo de fin y calcula el tiempo total que tomó el cálculo
    const tiempoFin = performance.now()
    
    // Actualizamos el estado con el resultado del MCD calculado
    setResultadoFactoresPrimos(resultado)
    
    // Actualizamos el estado con el tiempo que tomó el cálculo
    setTiempoFactoresPrimos(tiempoFin - tiempoInicio)
  }
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-6">Calcular MCD</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center">Ingresar Números</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                {numeros.map((numero, indice) => (
                  <div key={indice} className="flex items-center space-x-2">
                    <Label htmlFor={`numero-${indice}`} className="sr-only">
                      Número {indice + 1}
                    </Label>
                    <Input
                      id={`numero-${indice}`}
                      type="number"
                      placeholder={`Número ${indice + 1}`}
                      value={numero}
                      onChange={(e) => manejarCambioNumero(indice, e.target.value)}
                      className="flex-grow"
                    />
                    {indice >= 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removerCampoNumero(indice)}
                        className="flex-shrink-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={agregarCampoNumero} className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Agregar Número
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className='bg-indigo-200'>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center">Método Tradicional</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Este método encuentra el MCD verificando todos los números desde el menor hasta 1.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-4">
              <Button onClick={calcularMCDTradicional} className="w-full">Calcular MCD</Button>
              {resultadoTradicional !== null && (
                <div className="text-lg font-semibold">
                  El MCD es: {resultadoTradicional}
                </div>
              )}
              {tiempoTradicional !== null && (
                <div className="text-sm text-muted-foreground">
                  Tiempo: {tiempoTradicional.toFixed(5)} ms
                </div>
              )}
            </CardFooter>
          </Card>
          <Card className='bg-purple-300'>
            <CardHeader >
              <CardTitle className="text-xl font-semibold text-center">Método de Euclides</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Este método utiliza el algoritmo de Euclides, que es más eficiente para números grandes.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-4">
              <Button onClick={calcularMCDEuclides} className="w-full">Calcular MCD</Button>
              {resultadoEuclides !== null && (
                <div className="text-lg font-semibold">
                  El MCD es: {resultadoEuclides}
                </div>
              )}
              {tiempoEuclides !== null && (
                <div className="text-sm text-muted-foreground">
                  Tiempo: {tiempoEuclides.toFixed(5)} ms
                </div>
              )}
            </CardFooter>
          </Card>
          <Card className="md:col-span-3 bg-gradient-to-r from-indigo-400 to-cyan-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center">Método de Factores Primos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 text-white">
                Este método calcula el MCD encontrando los factores primos comunes de todos los números.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-4">
              <Button onClick={calcularMCDFactoresPrimos} className="w-full">Calcular MCD</Button>
              {resultadoFactoresPrimos !== null && (
                <div className="text-lg font-semibold">
                  El MCD es: {resultadoFactoresPrimos}
                </div>
              )}
              {tiempoFactoresPrimos !== null && (
                <div className="text-sm text-muted-foreground">
                  Tiempo: {tiempoFactoresPrimos.toFixed(5)} ms
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      <Link href="/" className="block w-full">
          <Button className="w-full mt-5 text-lg py-6" size="lg">
            Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
