# ddc-filter-matcher_vimregexp

Vim regexp matcher for ddc.vim It is useful for "ddc-source-line".

## Required

### denops.vim

<https://github.com/vim-denops/denops.vim>

### ddc.vim

<https://github.com/Shougo/ddc.vim>

## Configuration

```vim
call ddc#custom#patch_global('sourceOptions', #{
      \  _: #{
      \    matchers: ['matcher_vimregexp'],
      \  }
      \})
```
