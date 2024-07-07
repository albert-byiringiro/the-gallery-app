const url = `https://picsum.photos/v2/list?page=2&limit=100%203%20Message%20#group-1`

async function fetchData(url:string){
  try {
    const response = await fetch(url);

    // check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'There was an error...';
    console.error(errMsg);
    // throw error;
    return [];
    
  }
}

