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
    <div className="bg-card rounded-lg border shadow-sm p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0 w-full sm:w-auto">
          <Label htmlFor="search" className="sr-only">Search inventory items</Label>
          <div className="relative">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="search"
              type="text"
              placeholder="Search inventory items..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 sm:pl-10 pr-8 sm:pr-10 h-10 sm:h-12 text-sm sm:text-base border-border focus:border-primary focus:ring-primary bg-background"
            />
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 p-0 hover:bg-muted"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center w-full sm:w-auto justify-stretch sm:justify-start">
          {/* Category Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-10 sm:h-12 px-3 sm:px-4 border-border hover:border-primary bg-background min-w-0 flex-1 sm:flex-none"
              >
                <Filter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-sm sm:text-base">Filter</span>
                {selectedCategories.length > 0 && (
                  <Badge variant="secondary" className="ml-1 sm:ml-2 h-4 sm:h-5 px-1 sm:px-1.5 text-xs">
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

          {/* Selected Only Toggle */}
          <Button
            variant={showOnlySelected ? "default" : "outline"}
            onClick={() => onShowSelectedChange(!showOnlySelected)}
            className="h-10 sm:h-12 px-3 sm:px-4 border-border hover:border-primary bg-background min-w-0 flex-1 sm:flex-none text-sm sm:text-base"
          >
            Selected Only
          </Button>

          {/* Clear All Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              className="h-10 sm:h-12 px-3 sm:px-4 hover:bg-destructive/10 hover:text-destructive border border-transparent hover:border-destructive/20 flex-1 sm:flex-none text-sm sm:text-base"
            >
              <X className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center">
            <span className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 sm:mb-0">Active filters:</span>
            
            {searchTerm && (
              <Badge variant="outline" className="flex items-center gap-1 text-xs h-6 sm:h-7">
                <Search className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                <span className="max-w-20 sm:max-w-none truncate">"{searchTerm}"</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onSearchChange('')}
                  className="h-3 w-3 sm:h-4 sm:w-4 p-0 hover:bg-transparent ml-1"
                >
                  <X className="h-2 w-2 sm:h-3 sm:w-3" />
                </Button>
              </Badge>
            )}

            {selectedCategories.map((category) => (
              <Badge key={category} variant="outline" className="flex items-center gap-1 text-xs h-6 sm:h-7">
                <span className="truncate">{categoryLabels[category]}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCategory(category)}
                  className="h-3 w-3 sm:h-4 sm:w-4 p-0 hover:bg-transparent ml-1"
                >
                  <X className="h-2 w-2 sm:h-3 sm:w-3" />
                </Button>
              </Badge>
            ))}

            {showOnlySelected && (
              <Badge variant="outline" className="flex items-center gap-1 text-xs h-6 sm:h-7">
                Selected Only
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onShowSelectedChange(false)}
                  className="h-3 w-3 sm:h-4 sm:w-4 p-0 hover:bg-transparent ml-1"
                >
                  <X className="h-2 w-2 sm:h-3 sm:w-3" />
                </Button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};