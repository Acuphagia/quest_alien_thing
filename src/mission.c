#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    printf("Skibidi content type: Text/Html\n\n");

    char* query = getenv("QUERY_STRING");

    if (query && strstr(query, "file=missoin_notes.txt"))
    {
        printf("<h1>mission_notes.txt clicked!</h1>");
    }
    else
    {
        printf("<h1>NO or unknown input</h1>");
    }

    return 0;
}