"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Componente() {
  const [limite, establecerLimite] = useState(1024)
  const [primos, establecerPrimos] = useState<number[]>([])

  const calcularPrimos = (limite: number) => {
    const criba = new Array(limite + 1).fill(true)
    criba[0] = criba[1] = false
    for (let i = 2; i * i <= limite; i++) {
      if (criba[i]) {
        for (let j = i * i; j <= limite; j += i) {
          criba[j] = false
        }
      }
    }
    return criba.reduce((primos, esPrimo, num) => esPrimo ? [...primos, num] : primos, [])
  }

  const manejarCalculo = () => {
    const resultado = calcularPrimos(limite)
    establecerPrimos(resultado)
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Calculadora de Números Primos</h1>
      <div className="flex space-x-2">
        <Input
          type="number"
          value={limite}
          onChange={(e) => establecerLimite(Math.max(2, parseInt(e.target.value) || 2))}
          placeholder="Introduce el límite superior"
          className="flex-grow"
        />
        <Button onClick={manejarCalculo}>Calcular</Button>
      </div>
      <ScrollArea className="h-[500px] border rounded-md p-4">
        <h2 className="text-lg font-semibold mb-2">Números Primos:</h2>
        <div className="flex flex-wrap gap-2">
          {primos.map((primo) => (
            <span key={primo} className="bg-indigo-400 text-primary-foreground px-2 py-1 rounded-md text-sm">
              {primo}
            </span>
          ))}
        </div>
      </ScrollArea>
      <p className="text-sm text-muted-foreground text-center">
        Se encontraron {primos.length} números primos hasta {limite}
      </p>
    </div>
  )
}
