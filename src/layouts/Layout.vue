<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          Awesome ToDo
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          exact
          ripple
          v-for="menuItem in menuItems"
          :key="menuItem.index"
          :to="menuItem.route"
          :name="menuItem.name"
          :icon="menuItem.icon"
          :label="menuItem.name"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      bordered
      content-class="bg-primary">
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>
        <q-item
          v-for="menuItem in menuItems"
          :key="menuItem.index"
          :to="menuItem.route"
          clickable
          exact
          class="text-grey-4"
        >
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{menuItem.name}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      menuItems: [
        {
          route: "/",
          icon: "list",
          name: "ToDo"
        },
        {
          route: "/settings",
          icon: "settings",
          name: "Settings"
        }
      ]
    };
  },
  methods: {
    openURL
  }
};
</script>

<style lang="scss">
  /*
    In order to hide the footer for small screens,
    this media query is used to identify elements
    with the "q-footer" class and hide it from view.
  */
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none
    }
  }

  /*
    Since the background color of the navigation menu is a "dark" color,
    the default color for the navitaion menu's list items
    was changed to a grey-ish color to be visible. This left the
    router-link active color as a blue that can't be seen,
    so the color of the class applied to a router-link item
    in the navigation menu is changed to white so there's contrast
    between selected and unselected items in the menu.
  */
  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
</style>
