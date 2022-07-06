
import {AppProvider, Page, Card, Button} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import React from "react";
function App(){
    return (
       <AppProvider>
          <Page title="Example app">
            <Card sectioned>
              <Button>Show SpaceX ships</Button>
            </Card>
          </Page>
        </AppProvider>
      )
}

export default App;