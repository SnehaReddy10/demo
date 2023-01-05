#include<iostream>
using namespace std;

int main()
{
    #ifndef ONLINE_JUDGE
    freopen("input.txt","r",stdin);
    freopen("output.txt","w",stdout);
    #endif

    int a;
    cin>>a;
    int sum=0;
    for(int n=0;n<=a;n++){
        sum=n+sum;
    }
    cout<<sum<<endl;
    return 0;
}