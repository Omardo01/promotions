import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h1 className="text-4xl font-bold mb-12 text-foreground">Apps</h1>
      <div className="space-y-8 w-full max-w-md">
        <Link href="/promociones" className="block w-full">
          <Button className="w-full text-lg py-6" size="lg">
            Promociones
          </Button>
        </Link>
        <div className="relative">
          <Separator className="my-4" />
          
        </div>
        <Link href="/mcd" className="block w-full">
          <Button className="w-full text-lg py-6" size="lg">
            MCD
          </Button>
        </Link>
        <Separator className="my-4" />
          
          <Link href="/primos" className="block w-full">
          <Button className="w-full text-lg py-6 bg-cyan-300" size="lg">
            Numeros primos
          </Button>
        </Link>
      </div>
    </div>
  )
}