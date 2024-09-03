import Image from 'next/image';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ConfirmationAlert } from '@/components/confirmation/confirmation-alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CatalogItem } from '@/types/habbo';

// Mock data for the chart
const chartData = [
  { name: 'Jan', value: 1.5 },
  { name: 'Feb', value: 1.8 },
  { name: 'Mar', value: 2.0 },
  { name: 'Apr', value: 2.0 },
  { name: 'May', value: 1.9 },
  { name: 'Jun', value: 1.8 },
];

interface ItemInfoProps {
  selectedItem: CatalogItem | null;
  onDeselect: () => void;
}

export function ItemInfo({ selectedItem, onDeselect }: ItemInfoProps) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Item Info</CardTitle>
        {selectedItem && (
          <ConfirmationAlert
            message="You are about to clear your selection.\nThis action cannot be undone."
            onConfirm={onDeselect}
            trigger={
              <Button variant="destructive" size="sm" className="mt-2">
                Clear selection
              </Button>
            }
          />
        )}
      </CardHeader>
      <CardContent>
        {selectedItem ? (
          <>
            <div className="flex items-center mb-4">
              {selectedItem.itemImageUrl && (
                <Image
                  src={selectedItem.itemImageUrl}
                  alt={selectedItem.name}
                  className="mr-4 object-contain"
                  width={64}
                  height={64}
                />
              )}
              <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
            </div>
            <p className="mb-4">{selectedItem.description}</p>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Los valores proporcionados son orientativos. Aunque la naturaleza
              de un mercado cambiante hace que ninguna página de fans ni ninguna
              persona pueda ofrecer valores totalmente exactos, nuestro objetivo
              es ofrecer los listados más precisos basados en los precios de
              mercado. Recomendamos un margen de hasta un 20% por encima y por
              debajo de cada artículo para tener en cuenta la posible
              volatilidad del mercado en cualquier momento.
            </p>
          </>
        ) : (
          <p className="text-muted-foreground">
            Select an item to view details
          </p>
        )}
      </CardContent>
    </Card>
  );
}
