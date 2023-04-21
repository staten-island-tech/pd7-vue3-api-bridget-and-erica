<template>
    <div>
        <nav>
            <RouterLink to="/ApiData">APIIIII</RouterLink>
            <RouterLink to="/BarChart">Bar Chart</RouterLink>
        </nav>
        <RouterView/>
    </div>
</template>
  
<style scoped>
body {
    margin: 0;
}

nav {
    font-family: 'Noto Sans', sans-serif;
    letter-spacing: 0.1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    background-color: white;
    padding: 1rem 0rem 1rem 0rem;
}
</style>