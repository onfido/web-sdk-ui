    {/* <Navbar height={600} p="xs" width={{ base: 200 }}>

      <MenuItem label='documentation' Icon={Book2}/>
      <MenuItem label='User flow' Icon={BoxMultiple}/>
      <MenuItem label='Customisation' Icon={Brush}/>
      <MenuItem label='Options' Icon={ToggleRight}/>
      <MenuItem label='Settings' Icon={Settings}/>
      <MenuItem label='Console' Icon={BellRinging}/>
      <MenuItem label='Report issue' Icon={Bug}/>

    </Navbar> */}
    {/* <Menu/> */}
    {/* <Menu>
      <Routes>
        <Route path='/' element={<HomeMenu/>}/>
        <Route path='/demo' element={<Demo/>}/>
        <Route path='/demo/:hash' element={<Demo/>}/>

        <Route path='/userflows' element={<UserFlows/>}/>
        <Route path='/console' element={<Console/>}/>
        <Route path='/localisation' element={<Localisation/>}/>
      </Routes>
    </Menu> */}

    const MenuItem = ({ label, Icon }) => (
      <Tooltip position="right" label={label}>
        <ThemeIcon>
          <Icon size={20}/>
        </ThemeIcon>
         
      </Tooltip>
    )