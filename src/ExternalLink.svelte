<script>
  let { children, ...rest } = $props();
</script>

<a target="_blank" rel="noopener" {...rest}>
  {@render children?.()}
</a>
