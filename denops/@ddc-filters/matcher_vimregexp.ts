import {
  BaseFilter,
  Item,
  SourceOptions,
} from "https://deno.land/x/ddc_vim@v3.4.0/types.ts";
import { Denops, fn } from "https://deno.land/x/ddc_vim@v3.4.0/deps.ts";

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

    let compareStr: string = maxMatchLength == 0
      ? args.completeStr
      : args.completeStr.slice(0, maxMatchLength);
    if (args.sourceOptions.ignoreCase) {
      compareStr = compareStr.toLowerCase();
    }

    const items = [];
    for (const item of args.items) {
      const match = await fn.match(
        args.denops,
        args.sourceOptions.ignoreCase ? item.word.toLowerCase() : item.word,
        compareStr,
      ) as number;
      if (match >= 0) {
        items.push(item);
      }
    }
    return Promise.resolve(items);
  }

  override params(): Params {
    return {
      maxMatchLength: 0,
    };
  }
}
