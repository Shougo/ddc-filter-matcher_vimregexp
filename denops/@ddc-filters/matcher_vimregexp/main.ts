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

    const matches = await Promise.all(
      args.items.map(async (item) => {
        const match = await fn.match(
          args.denops,
          normalize(item.word),
          compareStr,
        );
        return match >= 0 ? item : null;
      }),
    );

    return matches.filter((item): item is Item => item !== null);
  }

  override params(): Params {
    return {
      maxMatchLength: 0,
    };
  }
}
