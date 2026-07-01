import type { Item, SourceOptions } from "@shougo/ddc-vim/types";
import { BaseFilter } from "@shougo/ddc-vim/filter";

import type { Denops } from "@denops/std";
import * as fn from "@denops/std/function";

type Params = {
  maxMatchLength: number;
};

export class Filter extends BaseFilter<Params> {
  override async filter(args: {
    denops: Denops;
    sourceOptions: SourceOptions;
    filterParams: Params;
    completeStr: string;
    items: Item[];
  }): Promise<Item[]> {
    const maxMatchLength = args.filterParams.maxMatchLength;

    const normalize = (str: string): string => {
      return args.sourceOptions.ignoreCase ? str.toLowerCase() : str;
    };

    const compareStr = normalize(
      maxMatchLength === 0
        ? args.completeStr
        : args.completeStr.slice(0, maxMatchLength),
    );

    const items: Item[] = [];
    for (const item of args.items) {
      const match = await fn.match(
        args.denops,
        args.sourceOptions.ignoreCase ? item.word.toLowerCase() : item.word,
        compareStr,
      );
      if (match >= 0) {
        items.push(item);
      }
    }
    return items;
  }

  override params(): Params {
    return {
      maxMatchLength: 0,
    };
  }
}
