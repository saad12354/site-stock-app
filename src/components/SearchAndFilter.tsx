import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Filter, X } from 'lucide-react';

export type FilterCategory = 'pipes' | 'insulation' | 'fittings' | 'nuts' | 'wires' | 'tools' | 'materials';

export interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategories: FilterCategory[];
  onCategoryChange: (categories: FilterCategory[]) => void;
  showOnlySelected: boolean;
  onShowSelectedChange: (value: boolean) => void;
  itemCounts: Record<FilterCategory, number>;
}

const categoryLabels: Record<FilterCategory, string> = {
  pipes: '🔥 Copper Pipes',
  insulation: '🛡️ Insulation', 
  fittings: '🔧 Pipe Fittings',
  nuts: '🔩 Flare Nuts',
  wires: '⚡ Wires',
  tools: '🛠️ Tools',
  materials: '📦 Materials'
};

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategories,
  onCategoryChange,
  showOnlySelected,
  onShowSelectedChange,
  itemCounts
}) => {
  const clearSearch = () => {
    onSearchChange('');
  };

  const clearAllFilters = () => {
    onSearchChange('');
    onCategoryChange([]);
    onShowSelectedChange(false);
  };

  const toggleCategory = (category: FilterCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const hasActiveFilters = searchTerm || selectedCategories.length > 0 || showOnlySelected;

  return (
    <div className="bg-card rounded-lg border shadow-sm p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <Label htmlFor="search" className="sr-only">Search inventory items</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="search"
              type="text"
              placeholder="Search inventory items (size, type, etc.)"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10 h-12 text-base border-border focus:border-primary focus:ring-primary bg-background"
            />
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Category Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-12 px-4 bg-background border-border hover:bg-muted focus:border-primary"
              >
                <Filter className="h-4 w-4 mr-2" />
                Categories
                {selectedCategories.length > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-popover border-border shadow-lg z-50"
            >
              <DropdownMenuLabel className="text-foreground">Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              {Object.entries(categoryLabels).map(([key, label]) => {
                const category = key as FilterCategory;
                const count = itemCounts[category] || 0;
                return (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                    className="text-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <span className="flex justify-between items-center w-full">
                      <span>{label}</span>
                      <Badge variant="outline" className="ml-2 h-5 px-2 text-xs">
                        {count}
                      </Badge>
                    </span>
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Show Only Selected */}
          <Button
            type="button"
            variant={showOnlySelected ? "default" : "outline"}
            onClick={() => onShowSelectedChange(!showOnlySelected)}
            className="h-12 px-4 whitespace-nowrap"
          >
            Selected Only
          </Button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              onClick={clearAllFilters}
              className="h-12 px-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-2">
              Search: "{searchTerm}"
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {selectedCategories.map(category => (
            <Badge key={category} variant="secondary" className="flex items-center gap-2">
              {categoryLabels[category]}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => toggleCategory(category)}
                className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {showOnlySelected && (
            <Badge variant="secondary" className="flex items-center gap-2">
              Selected Items Only
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onShowSelectedChange(false)}
                className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};