<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  supplies: { type: Array, required: true },
});

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

const search = ref('');
const status = ref('all');
const category = ref('all');

const categories = computed(() =>
  [...new Set(props.supplies.map((s) => s.category))].sort()
);

const statuses = ['all', 'owned', 'wanted', 'low', 'out', 'discontinued'];

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  return props.supplies.filter((s) => {
    if (status.value !== 'all' && s.status !== status.value) return false;
    if (category.value !== 'all' && s.category !== category.value) return false;
    if (!q) return true;
    const haystack = [s.name, s.brand, s.category, ...(s.tags ?? [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
});
</script>

<template>
  <div class="supply-table">
    <div class="controls">
      <label>
        <span>Search</span>
        <input v-model="search" type="search" placeholder="name, brand, tag…" />
      </label>
      <label>
        <span>Status</span>
        <select v-model="status">
          <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
        </select>
      </label>
      <label>
        <span>Category</span>
        <select v-model="category">
          <option value="all">all</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </label>
    </div>

    <p class="count">{{ filtered.length }} of {{ supplies.length }} supplies</p>

    <ul class="tag-grid">
      <li v-for="s in filtered" :key="s.id" class="shop-tag">
        <h3><a :href="`${base}/supplies/${s.id}`">{{ s.name }}</a></h3>
        <span class="badge" :class="`badge--${s.status}`">{{ s.status }}</span>
        <dl>
          <dt>Category</dt>
          <dd>{{ s.category }}</dd>
          <template v-if="s.quantity">
            <dt>Qty</dt>
            <dd>{{ s.quantity }}</dd>
          </template>
          <template v-if="s.location">
            <dt>Stored</dt>
            <dd>{{ s.location }}</dd>
          </template>
        </dl>
      </li>
    </ul>

    <p v-if="filtered.length === 0" class="empty">
      No supplies match these filters. Clear the search or widen the filters above.
    </p>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  background: var(--paper-deep);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 0.9rem 1rem;
}

.controls label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.controls span {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--graphite);
}

.controls input,
.controls select {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--line);
  border-radius: 2px;
  background: #fffdf6;
  color: var(--walnut);
}

.controls input {
  min-width: 14rem;
}

.count,
.empty {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--graphite);
  margin: 0.75rem 0 0;
}

.empty {
  margin-top: 1.5rem;
}
</style>
