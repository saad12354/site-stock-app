import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { WireData } from '@/types/inventory';

interface WireSectionProps {
  wires: WireData[];
  onUpdate: (wires: WireData[]) => void;
}

export const WireSection: React.FC<WireSectionProps> = ({ wires, onUpdate }) => {
  const updateWire = (index: number, updates: Partial<WireData>) => {
    const newWires = wires.map((wire, i) => 
      i === index ? { ...wire, ...updates } : wire
    );
    onUpdate(newWires);
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          ⚡ Wires
          <Badge variant="secondary" className="ml-auto">
            {wires.filter(w => w.selected).length} selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {wires.map((wire, index) => (
            <div key={wire.size} className="flex items-center gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors">
              <Checkbox
                checked={wire.selected}
                onCheckedChange={(checked) => 
                  updateWire(index, { selected: !!checked })
                }
                className="scale-125"
              />
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <Label className="font-semibold text-base">{wire.size} sq mm</Label>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Length (m)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={wire.length || ''}
                    onChange={(e) => 
                      updateWire(index, { length: Number(e.target.value) || 0 })
                    }
                    placeholder="Length"
                    className="h-10"
                    disabled={!wire.selected}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Cores</Label>
                  <div className="flex gap-1">
                    {[2, 4, 6].map(cores => (
                      <button
                        key={cores}
                        type="button"
                        onClick={() => updateWire(index, { cores })}
                        className={`px-2 py-1 rounded-md text-sm font-medium transition-colors ${
                          wire.cores === cores
                            ? 'bg-success text-success-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                        disabled={!wire.selected}
                      >
                        {cores}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {wire.selected && wire.length > 0 && (
                    <span className="text-success font-medium">
                      ✓ {wire.length}m {wire.cores}-core
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};